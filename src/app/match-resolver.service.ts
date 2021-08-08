import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CompetitionsService } from './competitions.service';

@Injectable({
  providedIn: 'root'
})
export class MatchResolverService {

  constructor(private competitionsService: CompetitionsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<any> | Promise<any> | any {
    return {
      competition: route.paramMap.get('competition_slug'),
      match: route.paramMap.get('match_slug')
    };
  }
}
