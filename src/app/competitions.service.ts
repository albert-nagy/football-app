import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Competition } from './models/competition.model';
import slugify from 'slugify';
import { CompetitionMatches } from './models/competition-matches.model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {
  competitions = new BehaviorSubject<Competition[]>([]);
  competition_matches = new BehaviorSubject<CompetitionMatches>(undefined);
  authHeader = {'X-Auth-Token': 'ef17495a22e4419f81b1c6756c9db20e'};

  constructor(private http: HttpClient, private title: Title) { }

  setTitle(title: string) {
    this.title.setTitle(`Football | ${title}`);
  }

  listCompetitions(): Observable<any> {
    return this.http.get<any>(`${environment.api}/competitions/?plan=TIER_ONE`, {'headers':this.authHeader})
    .pipe(
      tap(result => result.competitions
      .map(
        competition => {
          competition.slug = slugify(`${competition.name} ${competition.area.name}`, {lower: true});
        }
      ))
    );
  }

  listMatches(competition_id: number): Observable<any> {
    return this.http.get<any>(`${environment.api}/competitions/${competition_id}/matches`, {'headers':this.authHeader})
    .pipe(
      tap(result => result.matches
      .map(
        match => {
          match.slug = slugify(`${match.awayTeam.name} vs ${match.homeTeam.name}`, {lower: true});
        }
      ))
    );
  }

  getMatch(match_id: number): Observable<any> {
    return this.http.get<any>(`${environment.api}/matches/${match_id}`, {'headers':this.authHeader});
  }
}
