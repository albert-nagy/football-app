import { Competition } from "./competition.model";
import { Match } from "./match.model";

export class CompetitionMatches {
    competition: Competition;
    matches: Match[];
    
    constructor(
        id: number,
        matches: Match[]
    ){
        this.competition = this.competition;
        this.matches = matches;
    }
}