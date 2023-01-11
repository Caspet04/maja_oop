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
import type { Score } from "$lib/do_not_modify/score";
import {
    MultiScoreLeaderboard,
    SingleScoreLeaderboard,
    type ScoreLeaderboard,
} from "$lib/implementations/leaderboard";

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

        // Check if leaderboard already exists
        if (leaderboards.has(request.leaderboard_id)) return { success: false };

        if (request.save_multiple_scores_per_player) {
            leaderboards.set(
                request.leaderboard_id,
                new MultiScoreLeaderboard(request.leaderboard_id)
            );
        } else {
            leaderboards.set(
                request.leaderboard_id,
                new SingleScoreLeaderboard(request.leaderboard_id)
            );
        }

        const response: CreateLeaderboardResponse = {
            success: false,
        };
        return response;
    }

    async delete_leaderboard(
        request: DeleteLeaderboardRequest
    ): Promise<DeleteLeaderboardResponse> {
        console.log("DeleteLeaderboardRequest");
        console.log(request);

        // Check if leaderboard does not exist
        if (!leaderboards.has(request.leaderboard_id))
            return { success: false };

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

        // There is very little, if any, performance increase when using const
        // instead of let or var, but it is still useful to use it when a
        // variable will not change its values again.
        const leaderboard = leaderboards.get(request.leaderboard_id);

        // Check if leaderboard does not exist
        if (leaderboard == null) return { success: false, scores: [] };

        // It would have been preferable if the check could have returned
        // { success: false, scores: null } or just { success: false }
        // since it is slightly less performant to create a useless empty
        // array

        const response: GetScoresResponse = {
            success: true,
            scores: leaderboard.scores.slice(
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

        const leaderboard = leaderboards.get(request.leaderboard_id);

        // Check if leaderboard does not exist
        if (leaderboard == null)
            return {
                success: false,
                rank: {
                    index: 0,
                    leaderboard_id: "undefined",
                    score: {
                        value: 0,
                        date: new Date(),
                        player: { id: "undefined" },
                    },
                },
            };

        // Again, it would have been preferable if the check could have returned
        // { success: false, rank: null } or just { success: false }
        // since it is slightly less performant to create a useless object
        // and annoying as well

        const currentRank = leaderboard.add_score(request.score);
        const topRank = leaderboard.get_rank(request.score.player.id);

        // Return only success as true if it is the top score,
        // return the rank of the score itself regardless since
        // it could be useful to know the rank even if is not the
        // top score
        const response: SubmitScoreResponse = {
            success: currentRank.score.value == topRank?.score.value,
            rank: currentRank,
        };

        return response;
    }
    async get_all_ranks_for_player(
        request: GetRanksForPlayerRequest
    ): Promise<GetRanksForPlayerResponse> {
        console.log("GetRanksForPlayerRequest");
        console.log(request);

        let ranks: Rank[] = [];
        // for ... of loops are up to 2.7 times slower than a normal for loop
        for (const leaderboard of leaderboards.values()) {
            const rank = leaderboard.get_rank(request.player_id);
            if (rank != null) ranks.push(rank);
        }

        const response: GetRanksForPlayerResponse = {
            success: false,
            ranks,
        };

        return response;
    }
}
