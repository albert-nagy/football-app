import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Competition } from './models/competition.model';
import slugify from 'slugify';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {
  competitions = new BehaviorSubject<Competition[]>([]);
  authHeader = {'X-Auth-Token': 'ef17495a22e4419f81b1c6756c9db20e'};

  constructor(private http: HttpClient) { }
  

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
    return this.http.get<any>(`${environment.api}/competitions/${competition_id}/matches`, {'headers':this.authHeader});
  }
}
