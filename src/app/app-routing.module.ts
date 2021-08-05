import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CompetitionResolverService } from './competition-resolver.service';
import { CompetitionComponent } from './competition/competition.component';

const routes: Routes = [
  {
    path: '',
    component: CompetitionListComponent,
  },
  {
    path: ':competition_slug',
    component: CompetitionComponent,
    resolve: {
      competition_slug: CompetitionResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
