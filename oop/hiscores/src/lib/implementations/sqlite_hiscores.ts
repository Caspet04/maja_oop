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
import { sqliteClient } from "$lib/database";

export class SQLiteHiscores implements Hiscores {
    implementation: Implementation = Implementation.SQLITE;

    async get_leaderboards(
        request: GetLeaderboardsRequest
    ): Promise<GetLeaderboardsResponse> {
        let leaderboards = await sqliteClient.leaderboard.findMany({
            select: { id: true },
        });
        const response: GetLeaderboardsResponse = {
            success: true,
            leaderboards: leaderboards.map((leaderboard) => leaderboard.id),
        };

        return response;
    }
    async create_leaderboard(
        request: CreateLeaderboardRequest
    ): Promise<CreateLeaderboardResponse> {
        if (
            await sqliteClient.leaderboard.findFirst({
                where: { id: request.leaderboard_id },
            })
        ) {
            return {
                success: false,
            };
        }

        await sqliteClient.leaderboard.create({
            data: {
                id: request.leaderboard_id,
                multiple_scores: request.save_multiple_scores_per_player,
            },
        });

        const response: CreateLeaderboardResponse = {
            success: true,
        };
        return response;
    }
    async delete_leaderboard(
        request: DeleteLeaderboardRequest
    ): Promise<DeleteLeaderboardResponse> {
        if (
            !(await sqliteClient.leaderboard.findFirst({
                where: { id: request.leaderboard_id },
            }))
        ) {
            return {
                success: false,
            };
        }

        await sqliteClient.leaderboard.delete({
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
        let leaderboard = await sqliteClient.leaderboard.findFirst({
            where: { id: request.leaderboard_id },
            include: { scores: true },
        });
        let scores: Score[] = [];
        if (leaderboard == null || leaderboard.scores == null) {
            const response: GetScoresResponse = {
                success: false,
                scores: [],
            };
        } else {
            scores = leaderboard.scores
                .map((score) => {
                    return {
                        value: score.value,
                        date: score.date,
                        player: { id: score.playerId },
                    };
                })
                .slice(request.start_index, request.end_index);
        }

        const response: GetScoresResponse = {
            success: true,
            scores: scores,
        };

        return response;
    }
    async submit_score_to_leaderboard(
        request: SubmitScoreRequest
    ): Promise<SubmitScoreResponse> {
        const leaderboard = await sqliteClient.leaderboard.findFirst({
            where: { id: request.leaderboard_id },
            include: {
                scores: {
                    orderBy: {
                        value: "desc",
                    },
                },
            },
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
        const score = {
            value: request.score.value,
            date: request.score.date,
            playerId: request.score.player.id,
        };

        if (leaderboard.multiple_scores || highscore == undefined) {
            await sqliteClient.leaderboard.update({
                where: { id: request.leaderboard_id },
                data: { scores: { create: score } },
            });

            const scores = await sqliteClient.score.findMany({
                where: { leaderboardId: request.leaderboard_id },
                orderBy: {
                    value: "desc",
                },
            });
            const index = scores.findIndex((score) => {
                return (
                    score.playerId == score.playerId &&
                    score.value == score.value
                );
            });

            return {
                success: true,
                rank: {
                    index: index + 1,
                    score: request.score,
                    leaderboard_id: request.leaderboard_id,
                },
            };
        }

        if (highscore.value < score.value) {
            await sqliteClient.score.update({
                where: { id: highscore.id },    
                data: score,
            });

            const scores = await sqliteClient.score.findMany({
                where: { leaderboardId: request.leaderboard_id },
                orderBy: {
                    value: "desc",
                },
            });
            const index = scores.findIndex((score) => {
                return (
                    score.playerId == score.playerId &&
                    score.value == score.value
                );
            });

            return {
                success: true,
                rank: {
                    index: index + 1,
                    score: request.score,
                    leaderboard_id: request.leaderboard_id,
                },
            };
        }

        const response: SubmitScoreResponse = {
            success: false,
            rank: {
                index: -1,
                score: request.score,
                leaderboard_id: request.leaderboard_id,
            },
        };

        return response;
    }
    async get_all_ranks_for_player(
        request: GetRanksForPlayerRequest
    ): Promise<GetRanksForPlayerResponse> {
        let ranks: Rank[] = [];

        const result = await this.get_leaderboards({});
        const leaderboardIds = result.leaderboards;

        for (let i = 0; i < leaderboardIds.length; i++) {
            let scores = (
                await sqliteClient.leaderboard.findFirst({
                    where: { id: leaderboardIds[i] },
                    include: { scores: true },
                })
            )?.scores;
            if (scores == undefined) continue;

            scores = scores.sort((a, b) => b.value - a.value);
            const scoreIndex = scores.findIndex(
                (score) => score.playerId == request.player_id
            );
            const score: Score = {
                value: scores[scoreIndex].value,
                date: scores[scoreIndex].date,
                player: { id: scores[scoreIndex].playerId },
            };
            if (scoreIndex > -1)
                ranks.push({
                    index: scoreIndex + 1,
                    leaderboard_id: leaderboardIds[i],
                    score,
                });
        }

        const response: GetRanksForPlayerResponse = {
            success: ranks.length != 0,
            ranks,
        };

        return response;
    }
}
