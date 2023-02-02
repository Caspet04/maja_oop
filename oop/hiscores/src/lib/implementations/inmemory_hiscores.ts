import { Implementation, type Hiscores } from "$lib/do_not_modify/hiscores";
import type { Leaderboard } from "$lib/do_not_modify/leaderboard";
import type { Rank } from "$lib/do_not_modify/rank";
import type {
    GetLeaderboardsRequest,
    GetLeaderboardsResponse,
    CreateLeaderboardRequest,
    CreateLeaderboardResponse,
    DeleteLeaderboardRequest,
    DeleteLeaderboardResponse,
    GetScoresRequest,
    GetScoresResponse,
    SubmitScoreRequest,
    SubmitScoreResponse,
    GetRanksForPlayerRequest,
    GetRanksForPlayerResponse,
} from "$lib/do_not_modify/requests";
import { JumpScore, type Score } from "$lib/do_not_modify/score";

// The lazy/short version is to simply extends the leaderboard and add a boolean
// that decides if multiple scores can be saved and then remove other scores
// by the same player when adding scores
interface CustomLeaderboard extends Leaderboard {
    multiple_scores: boolean;
}

let leaderboards: Map<string, CustomLeaderboard> = new Map<
    string,
    CustomLeaderboard
>();

export class InMemoryHiscores implements Hiscores {
    implementation: Implementation = Implementation.INMEMORY;

    async get_leaderboards(
        request: GetLeaderboardsRequest
    ): Promise<GetLeaderboardsResponse> {
        const response: GetLeaderboardsResponse = {
            success: true,
            leaderboards: [...leaderboards.keys()],
        };

        return response;
    }

    async create_leaderboard(
        request: CreateLeaderboardRequest
    ): Promise<CreateLeaderboardResponse> {
        // Return success false if leaderboard already exists
        if (leaderboards.has(request.leaderboard_id)) return { success: false };

        // Create the leaderboard
        leaderboards.set(request.leaderboard_id, {
            id: request.leaderboard_id,
            scores: [],
            multiple_scores: request.save_multiple_scores_per_player,
        });

        const response: CreateLeaderboardResponse = {
            success: true,
        };
        return response;
    }

    async delete_leaderboard(
        request: DeleteLeaderboardRequest
    ): Promise<DeleteLeaderboardResponse> {
        // Return success false if leaderboard does not exist
        if (!leaderboards.has(request.leaderboard_id))
            return { success: false };

        // Delete the leaderboard
        leaderboards.delete(request.leaderboard_id);

        const response: DeleteLeaderboardResponse = {
            success: true,
        };
        return response;
    }

    async get_scores_from_leaderboard(
        request: GetScoresRequest
    ): Promise<GetScoresResponse> {
        // Return success false if leaderboard does not exist
        const leaderboard = leaderboards.get(request.leaderboard_id);
        if (leaderboard == null)
            return {
                success: false,
                scores: [],
            };

        // Get the scores
        const scores = Array.from(leaderboard.scores).slice(
            request.start_index,
            request.end_index
        );

        const response: GetScoresResponse = {
            success: true,
            scores,
        };

        return response;
    }

    async submit_score_to_leaderboard(
        request: SubmitScoreRequest
    ): Promise<SubmitScoreResponse> {
        // Return success false if leaderboard does not exist
        const leaderboard = leaderboards.get(request.leaderboard_id);
        if (leaderboard == null) {
            return {
                success: false,
                rank: {
                    index: 0,
                    leaderboard_id: request.leaderboard_id,
                    score: request.score,
                },
            };
        }

        const otherScoreIndex = leaderboard.scores.findIndex(
            (value) => value.player.id == request.score.player.id
        );

        // Return success true if each player has multiple scores or it is the
        // first score
        if (leaderboard.multiple_scores || otherScoreIndex < 0) {
            leaderboard.scores.push(request.score);

            // Sort from largest to smallest
            leaderboard.scores.sort((a, b) => b.value - a.value);

            const scoreIndex = leaderboard.scores.indexOf(request.score);
            return {
                success: true,
                rank: {
                    index: scoreIndex,
                    leaderboard_id: request.leaderboard_id,
                    score: request.score,
                },
            };
        }

        // Return success false if only a single score is saved and the new
        // score is smaller than the previous highscore
        if (leaderboard.scores[otherScoreIndex].value > request.score.value) {
            return {
                success: false,
                rank: {
                    index: 0,
                    leaderboard_id: request.leaderboard_id,
                    score: request.score,
                },
            };
        }

        // If neither or the above return statements were hit, it means that
        // the leaderboard only allows a single score and the new score is
        // larger than the previous highscore, so return success true
        leaderboard.scores[otherScoreIndex] = request.score;
        // Sort from largest to smallest
        leaderboard.scores.sort((a, b) => b.value - a.value);
        const newIndex = leaderboard.scores.indexOf(request.score);
        return {
            success: true,
            rank: {
                index: newIndex,
                leaderboard_id: request.leaderboard_id,
                score: request.score,
            },
        };
    }

    async get_all_ranks_for_player(
        request: GetRanksForPlayerRequest
    ): Promise<GetRanksForPlayerResponse> {
        let ranks: Rank[] = [];

        for (const leaderboard of leaderboards.values()) {
            let scoreIndex = leaderboard.scores.findIndex(
                (score) => score.player.id == request.player_id
            );
            if (scoreIndex > -1)
                ranks.push({
                    index: scoreIndex,
                    leaderboard_id: leaderboard.id,
                    score: leaderboard.scores[scoreIndex],
                });
        }

        const response: GetRanksForPlayerResponse = {
            success: ranks.length != 0,
            ranks,
        };

        return response;
    }
}
