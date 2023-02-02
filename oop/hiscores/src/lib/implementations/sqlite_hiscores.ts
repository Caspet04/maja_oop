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
import { database } from "$lib/database";

async function leaderboardExists(id: string): Promise<boolean> {
    return (
        (await database.leaderboard.findFirst({
            where: { id },
        })) != null
    );
}

async function get_rank_of_score_in_leaderboard(
    score: Partial<Score>,
    leaderboard_id: string
): Promise<Rank | null> {
    const scores = await database.score.findMany({
        where: { leaderboardId: leaderboard_id },
        orderBy: {
            value: "desc",
        },
    });

    const index = scores.findIndex((_score) => {
        if (score.player == null && score.value == null) return false;

        if (score.value != null && _score.value != score.value) return false;

        if (score.player != null && _score.playerId != score.player.id)
            return false;

        return true;
    });

    if (index < 0) return null;

    return {
        index,
        score: {
            player: {
                id: scores[index].playerId,
            },
            value: scores[index].value,
            date: scores[index].date,
        },
        leaderboard_id,
    };
}

export class SQLiteHiscores implements Hiscores {
    implementation: Implementation = Implementation.SQLITE;

    async get_leaderboards(
        request: GetLeaderboardsRequest
    ): Promise<GetLeaderboardsResponse> {
        const leaderboards = await database.leaderboard.findMany({
            select: { id: true },
        });

        return {
            success: true,
            leaderboards: leaderboards.map((leaderboard) => leaderboard.id),
        };
    }
    async create_leaderboard(
        request: CreateLeaderboardRequest
    ): Promise<CreateLeaderboardResponse> {
        if (await leaderboardExists(request.leaderboard_id)) {
            return {
                success: false,
            };
        }

        await database.leaderboard.create({
            data: {
                id: request.leaderboard_id,
                multiple_scores: request.save_multiple_scores_per_player,
            },
        });

        return {
            success: true,
        };
    }
    async delete_leaderboard(
        request: DeleteLeaderboardRequest
    ): Promise<DeleteLeaderboardResponse> {
        if (!(await leaderboardExists(request.leaderboard_id))) {
            return {
                success: false,
            };
        }

        await database.leaderboard.delete({
            where: {
                id: request.leaderboard_id,
            },
        });

        const response: DeleteLeaderboardResponse = {
            success: true,
        };
        return response;
    }
    async get_scores_from_leaderboard(
        request: GetScoresRequest
    ): Promise<GetScoresResponse> {
        const leaderboard = await database.leaderboard.findFirst({
            where: { id: request.leaderboard_id },
            include: { scores: { orderBy: { value: "desc" } } },
        });

        if (leaderboard == null || leaderboard.scores == null) {
            return {
                success: false,
                scores: [],
            };
        }

        const scores = leaderboard.scores
            .map((score) => ({
                value: score.value,
                date: score.date,
                player: { id: score.playerId },
            }))
            .slice(request.start_index, request.end_index);

        return {
            success: true,
            scores,
        };
    }
    async submit_score_to_leaderboard(
        request: SubmitScoreRequest
    ): Promise<SubmitScoreResponse> {
        const leaderboard = await database.leaderboard.findFirst({
            where: { id: request.leaderboard_id },
            include: { scores: { orderBy: { value: "desc" } } },
        });
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

        const highscore = leaderboard.scores.find(
            (score) => score.playerId == request.score.player.id
        );
        const requestScore = {
            value: request.score.value,
            date: request.score.date,
            playerId: request.score.player.id,
        };

        if (leaderboard.multiple_scores || highscore == undefined) {
            await database.leaderboard.update({
                where: { id: request.leaderboard_id },
                data: { scores: { create: requestScore } },
            });

            const rank = await get_rank_of_score_in_leaderboard(
                request.score,
                leaderboard.id
            );

            return {
                success: true,
                rank: rank ?? {
                    index: -1,
                    score: request.score,
                    leaderboard_id: request.leaderboard_id,
                },
            };
        }

        if (highscore.value > requestScore.value) {
            return {
                success: false,
                rank: {
                    index: -1,
                    score: request.score,
                    leaderboard_id: request.leaderboard_id,
                },
            };
        }

        await database.score.update({
            where: { id: highscore.id },
            data: requestScore,
        });

        const rank = await get_rank_of_score_in_leaderboard(
            request.score,
            leaderboard.id
        );

        return {
            success: true,
            rank: rank ?? {
                index: -1,
                score: request.score,
                leaderboard_id: request.leaderboard_id,
            },
        };
    }
    async get_all_ranks_for_player(
        request: GetRanksForPlayerRequest
    ): Promise<GetRanksForPlayerResponse> {
        let ranks: Rank[] = [];

        const result = await this.get_leaderboards({});
        const leaderboardIds = result.leaderboards;

        for (let i = 0; i < leaderboardIds.length; i++) {
            const rank = await get_rank_of_score_in_leaderboard(
                { player: { id: request.player_id } },
                leaderboardIds[i]
            );

            if (rank != null) {
                ranks.push(rank);
            }
        }

        const response: GetRanksForPlayerResponse = {
            success: ranks.length != 0,
            ranks,
        };

        return response;
    }
}
