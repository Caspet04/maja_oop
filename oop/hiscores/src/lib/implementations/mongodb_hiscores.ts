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
import * as database from "$lib/database";
import type { Collection, MongoClient, WithId } from "mongodb";
import type { Leaderboard } from "$lib/do_not_modify/leaderboard";

const client: MongoClient = await database.connect();
const leaderboards: Collection = client.db("test").collection("leaderboards");

interface LeaderboardDocument extends Leaderboard, WithId<Document> {
    multipleScores: boolean;
}

export class MongoDBHiscores implements Hiscores {
    implementation: Implementation = Implementation.MONGODB;

    async create_leaderboard(
        request: CreateLeaderboardRequest
    ): Promise<CreateLeaderboardResponse> {
        if (
            (await leaderboards.findOne({ name: request.leaderboard_id })) !=
            null
        ) {
            return { success: false };
        }
        //så?
        // Jag tror det, ser inte om det påverkade med errors dock
        const result = await leaderboards.insertOne({
            name: request.leaderboard_id,
            multipleScores: request.save_multiple_scores_per_player,
            scores: [],
        });

        return {
            success: result.acknowledged,
        };
    }

    async delete_leaderboard(
        request: DeleteLeaderboardRequest
    ): Promise<DeleteLeaderboardResponse> {
        const result = await leaderboards.deleteOne({
            name: request.leaderboard_id,
        });

        return {
            success: result.acknowledged,
        };
    }

    async get_scores_from_leaderboard(
        request: GetScoresRequest
    ): Promise<GetScoresResponse> {
        const leaderboard = (await leaderboards.findOne({
            name: request.leaderboard_id,
        })) as any;

        if (leaderboard != null) {
            const scores = leaderboard.scores.sort(
                (a: Score, b: Score) => b.value - a.value
            );
            return {
                success: true,
                scores: scores.slice(request.start_index, request.end_index),
            };
        }

        return {
            success: false,
            scores: [],
        };
    }

    async submit_score_to_leaderboard(
        request: SubmitScoreRequest
    ): Promise<SubmitScoreResponse> {
        const leaderboard: LeaderboardDocument = (await leaderboards.findOne({
            name: request.leaderboard_id,
        })) as any;

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

        leaderboard.scores.sort((a: Score, b: Score) => b.value - a.value);

        const otherScoreIndex = leaderboard.scores.findIndex(
            (value) => value.player.id == request.score.player.id
        );

        if (leaderboard.multipleScores || otherScoreIndex < 0) {
            const result = await leaderboards.updateOne(
                { name: request.leaderboard_id },
                { $push: { scores: request.score } }
            );
            //
            // Har du en massa error eller är det bara för mig?
            leaderboard.scores.push(request.score);
            leaderboard.scores.sort((a: Score, b: Score) => b.value - a.value);

            const scoreIndex = leaderboard.scores.findIndex(
                (value) =>
                    value.value == request.score.value &&
                    value.player.id == request.score.player.id
            );

            return {
                success: true,
                rank: {
                    index: scoreIndex,
                    score: request.score,
                    leaderboard_id: request.leaderboard_id,
                },
            };
        }

        const result = await leaderboards.updateOne(
            { scores: { player: request.score.player.id } },
            { $set: { "scores:.$": request.score } }
        );

        const previousScoreIndex = leaderboard.scores.findIndex(
            (a: Score) => a.player.id == request.score.player.id
        );

        leaderboard.scores[previousScoreIndex] = request.score;
        leaderboard.scores.sort((a: Score, b: Score) => b.value - a.value);

        const scoreIndex = leaderboard.scores.findIndex(
            (value) =>
                value.value == request.score.value &&
                value.player.id == request.score.player.id
        );

        return {
            success: result.acknowledged,
            rank: {
                index: scoreIndex,
                score: request.score,
                leaderboard_id: request.leaderboard_id,
            },
        };
    }

    async get_leaderboards(
        request: GetLeaderboardsRequest
    ): Promise<GetLeaderboardsResponse> {
        const result = leaderboards.find();

        const leaderboardArray = await result.toArray();

        return {
            success: true,
            leaderboards: leaderboardArray.map(
                (leaderboard) => leaderboard.name
            ),
        };
    }

    async get_all_ranks_for_player(
        request: GetRanksForPlayerRequest
    ): Promise<GetRanksForPlayerResponse> {
        type PlayerScore = { score: Score; leaderboard: string };
        let playerScores: PlayerScore[] = [];
        const result = leaderboards.find();
        const leaderboardArray =
            (await result.toArray()) as LeaderboardDocument[];
        leaderboardArray.forEach((leaderboard: Leaderboard) => {
            // Tror att leaderboard inte skapas korrekt kanske, eller att det inte läggs in
            console.log(leaderboard);
            leaderboard.scores.forEach((score: Score) => {
                if ((score.player.id = request.player_id)) {
                    playerScores.push({
                        score: score,
                        leaderboard: leaderboard.id,
                    });
                }
            });
        });

        let ranks: Rank[] = [];
        playerScores.sort(
            (a: PlayerScore, b: PlayerScore) => b.score.value - a.score.value
        );
        for (let i = 0; i < playerScores.length; i++) {
            ranks.push({
                index: i,
                score: playerScores[i].score,
                leaderboard_id: playerScores[i].leaderboard,
            });
        }

        return {
            success: true,
            ranks: ranks,
        };
    }
}
