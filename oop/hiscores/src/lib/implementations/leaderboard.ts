import type { Leaderboard } from "$lib/do_not_modify/leaderboard";
import type { Rank } from "$lib/do_not_modify/rank";
import type { Score } from "$lib/do_not_modify/score";

export class ScoreLeaderboard implements Leaderboard {
    public id: string;
    public scores: Score[] = [];

    private readonly multiple_scores: boolean;

    public constructor(id: string, multiple_scores: boolean) {
        this.id = id;
        this.multiple_scores = multiple_scores;
    }

    /**
     * Add a score to the leaderboard
     * @param score the score to be added
     * @returns if true it was successfully added, otherwise returns false
     */
    public add_score(score: Score): boolean {
        const otherScoreIndex = this.scores.findIndex(
            (value) => value.player.id == score.player.id
        );

        // Return true if each player has multiple scores or it is the
        // first score
        if (this.multiple_scores || otherScoreIndex < 0) {
            this.scores.push(score);

            // Sort from largest to smallest
            this.scores.sort((a, b) => b.value - a.value);
            return true;
        }

        // Return false if only a single score is saved and the new
        // score is smaller than the previous highscore
        if (this.scores[otherScoreIndex].value > score.value) {
            return false;
        }

        // If neither or the above return statements were hit, it means that
        // the leaderboard only allows a single score and the new score is
        // larger than the previous highscore, so return true
        this.scores[otherScoreIndex] = score;
        // Sort from largest to smallest
        this.scores.sort((a, b) => b.value - a.value);
        return true;
    }

    /**
     * Get the `Rank` of a score in the leaderboard
     * @param score the score to search for
     * @returns the `Rank` or `null` if the score is not in the leaderboard
     */
    public get_rank_of_score(score: Score): Rank | null {
        const scoreIndex = this.scores.findIndex(
            (other) =>
                other.date == score.date &&
                other.player.id == score.player.id &&
                other.value == score.value
        );

        if (scoreIndex < 0) return null;

        return {
            index: scoreIndex + 1,
            leaderboard_id: this.id,
            score: this.scores[scoreIndex],
        };
    }

    /**
     * Returns all scores inbetween two indices
     * @param start_index
     * @param end_index
     * @returns `Score[]`
     */
    public get_scores(start_index: number, end_index: number) {
        return this.scores.slice(start_index, end_index);
    }

    /**
     * Get the `Rank` of a player in the leaderboard
     * @param player_id the player id to search for
     * @returns the `Rank` or `null` if the player is not in the leaderboard
     */
    public get_rank_of_player(player_id: string): Rank | null {
        const scoreIndex = this.scores.findIndex(
            (other) => other.player.id == player_id
        );

        if (scoreIndex < 0) return null;

        return {
            index: scoreIndex + 1,
            leaderboard_id: this.id,
            score: this.scores[scoreIndex],
        };
    }
}
