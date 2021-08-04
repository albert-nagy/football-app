import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private http: HttpClient) { }

  createHeader(){
    return {'X-Auth-Token': 'ef17495a22e4419f81b1c6756c9db20e'};
  }

  listCompetitions(): Observable<any> {
    return this.http.get<any>(`${environment.api}/competitions/`, {'headers':this.createHeader()});
  }
}
