import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CompetitionResolverService } from './competition-resolver.service';
import { CompetitionComponent } from './competition/competition.component';
import { MatchResolverService } from './match-resolver.service';
import { MatchComponent } from './match/match.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: CompetitionListComponent,
  },
  {
    path: ':competition_slug/:match_slug',
    component: MatchComponent,
    resolve: {
      slugs: MatchResolverService
    }
  },
  {
    path: ':competition_slug',
    component: CompetitionComponent,
    resolve: {
      competition_slug: CompetitionResolverService
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
