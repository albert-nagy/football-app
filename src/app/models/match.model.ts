import { Team } from "./team.model";

export class Match {
    id: number;
    awayTeam: Team;
    homeTeam: Team;
    utcDate: Date;
    
    constructor(
        id: number,
        awayTeam: Team,
        homeTeam: Team,
        utcDate: Date,
    ){
        this.id = id;
        this.awayTeam = awayTeam;
        this.homeTeam = homeTeam;
        this.utcDate = utcDate;
    }
}