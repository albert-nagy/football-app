import { Team } from "./team.model";

export class Match {
    id: number;
    awayTeam: Team;
    homeTeam: Team;
    slug: string;
    utcDate: Date;
    status: string;
    
    constructor(
        id: number,
        awayTeam: Team,
        homeTeam: Team,
        utcDate: Date,
        status: string
    ){
        this.id = id;
        this.awayTeam = awayTeam;
        this.homeTeam = homeTeam;
        this.utcDate = utcDate;
        this.status = status;
    }
}