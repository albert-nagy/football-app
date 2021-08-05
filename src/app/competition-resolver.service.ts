import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CompetitionsService } from './competitions.service';
import { Competition } from './models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionResolverService {

  constructor(private competitionsService: CompetitionsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<string> | Promise<string> | string {
    return route.paramMap.get('competition_slug');
  }
}
