import { Implementation, type Hiscores } from "$lib/do_not_modify/hiscores";
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
import { ScoreLeaderboard } from "./leaderboard";

// LEADERBOARD IS REPRESENTED AS A MAP OF KEY - VALUE PAIRS
// THE KEY IS THE LEADERBOARD_ID, THE VALUE IS THE LEADERBOARD ITSELF
// WE CAN LATER USE SET/GET/DELETE TO CRATE/READ/DELETE LEADERBOARDS
// WE CAN GET THE LEADERBOARD TO GET THE SCORES AND UPDATE THE SCORES
let leaderboards: Map<string, ScoreLeaderboard> = new Map<
    string,
    ScoreLeaderboard
>();

export class InMemoryHiscores implements Hiscores {
    implementation: Implementation = Implementation.INMEMORY;

    async get_leaderboards(
        request: GetLeaderboardsRequest
    ): Promise<GetLeaderboardsResponse> {
        // NO NEED TO TOUCH THIS. IMPLEMENTATION FINISHED
        // THE RESPONSE SHOULD RETURN THE IDS FOR ALL LEADERBOARDS
        // GETTING THE KEYS FOR THE MAP GETS THE IDS FOR THE LEADERBOARDS

        const response: GetLeaderboardsResponse = {
            success: true,
            leaderboards: [...leaderboards.keys()],
        };

        return response;
    }

    async create_leaderboard(
        request: CreateLeaderboardRequest
    ): Promise<CreateLeaderboardResponse> {
        console.log("CreateLeaderboardRequest");
        console.log(request);

        // Return success false if leaderboard already exists
        if (leaderboards.has(request.leaderboard_id)) return { success: false };

        leaderboards.set(
            request.leaderboard_id,
            new ScoreLeaderboard(
                request.leaderboard_id,
                request.save_multiple_scores_per_player
            )
        );

        const response: CreateLeaderboardResponse = {
            success: true,
        };
        return response;
    }

    async delete_leaderboard(
        request: DeleteLeaderboardRequest
    ): Promise<DeleteLeaderboardResponse> {
        console.log("DeleteLeaderboardRequest");
        console.log(request);

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
        console.log("GetScoresRequest");
        console.log(request);

        // Return success false if leaderboard does not exist
        const leaderboard = leaderboards.get(request.leaderboard_id);
        if (leaderboard == null)
            return {
                success: false,
                scores: [],
            };

        const response: GetScoresResponse = {
            success: true,
            scores: leaderboard.get_scores(
                request.start_index,
                request.end_index
            ),
        };

        return response;
    }
    async submit_score_to_leaderboard(
        request: SubmitScoreRequest
    ): Promise<SubmitScoreResponse> {
        console.log("SubmitScoreRequest");
        console.log(request);

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

        const success = leaderboard.add_score(request.score);
        const rank = leaderboard.get_rank_of_score(request.score);

        return {
            success: success,
            rank: rank ?? {
                index: 0,
                leaderboard_id: request.leaderboard_id,
                score: request.score,
            },
        };
    }

    async get_all_ranks_for_player(
        request: GetRanksForPlayerRequest
    ): Promise<GetRanksForPlayerResponse> {
        console.log("GetRanksForPlayerRequest");
        console.log(request);

        let ranks: Rank[] = [];

        for (const leaderboard of leaderboards.values()) {
            const rank = leaderboard.get_rank_of_player(request.player_id);
            if (rank != null) ranks.push(rank);
        }

        const response: GetRanksForPlayerResponse = {
            success: true,
            ranks,
        };

        return response;
    }
}
