import type { Leaderboard } from "$lib/do_not_modify/leaderboard";
import type { Player } from "$lib/do_not_modify/player";
import type { Rank } from "$lib/do_not_modify/rank";
import type { Score } from "$lib/do_not_modify/score";

// This solves the issue of some leaderboards only storing the top score by
// having an abstract class with two subclasses that handles the scores
// slightly differently.
// The one that has multiple scores per player has an array that is sorted
// whenever a new score is added.
// The one that has a single score for each playeer has a dictionary of
// scores and a dictionary of the rank with the player id being the key.

export abstract class ScoreLeaderboard implements Leaderboard {
    private readonly _id: string;
    get id(): string {
        return this._id;
    }

    // Implement the scores variable, it's sort of stupid that this can be done
    // this way since that means that an interface has no way of specifying
    // that a value must be able to be gettable and/or settable.
    // However, as far as I am aware, this is the intended behaviour since that
    // is considered an implementation detail
    get scores(): Score[] {
        return this.get_scores();
    }

    constructor(id: string) {
        this._id = id;
    }

    public abstract add_score(score: Score): Rank;
    public abstract get_scores(): Score[];
    public abstract get_rank(player_id: string): Rank | null;
}

export class MultiScoreLeaderboard extends ScoreLeaderboard {
    private _scores: Score[] = [];

    public add_score(score: Score): Rank {
        this._scores.push(score);

        // Sort the array by the scores value,
        this._scores.sort((a, b) => b.value - a.value);

        // Return the rank of this specific score
        let index = this._scores.indexOf(score);
        return {
            index: index + 1,
            leaderboard_id: this.id,
            score,
        };
    }

    public get_scores(): Score[] {
        return this._scores;
    }

    public get_rank(player_id: string): Rank | null {
        // Loop over each score and return the first one that is by the player,
        // it can do this since the array is sorted
        for (let i = 0; i < this._scores.length; i++) {
            if (this._scores[i].player.id == player_id) {
                return {
                    index: i + 1,
                    leaderboard_id: this.id,
                    score: this._scores[i],
                };
            }
        }

        return null;
    }
}

export class SingleScoreLeaderboard extends ScoreLeaderboard {
    private scoreMap: Map<string, Score> = new Map<string, Score>();
    private rankings: Map<string, number> = new Map<string, number>();

    public add_score(score: Score): Rank {
        // Calculate the rank of the new score
        let index = 1;
        for (const otherScore of this.scoreMap.values()) {
            if (otherScore.value < score.value) break;
            index++;
        }

        // Check that the previous score is not lower
        let previousScore = this.scoreMap.get(score.player.id);
        if (previousScore != null && previousScore.value > score.value)
            return { index, leaderboard_id: this.id, score };

        // Add the score and rank
        this.rankings.set(score.player.id, index);
        this.scoreMap.set(score.player.id, score);

        return { index, leaderboard_id: this.id, score };
    }

    // Convert the score dictionary into an array
    public get_scores(): Score[] {
        return Array.from(this.scoreMap.values());
    }

    public get_rank(player_id: string): Rank | null {
        let score = this.scoreMap.get(player_id);
        if (score == null) return null;

        let rank = this.rankings.get(player_id);
        if (rank == null) return null;

        return { index: rank, leaderboard_id: this.id, score };
    }
}
