import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompetitionsService } from '../competitions.service';
import { Competition } from '../models/competition.model';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  competitions: Competition[];

  constructor(private competitionsService: CompetitionsService) { }

  ngOnInit(): void {
    this.subscription.add(this.competitionsService.competitions.subscribe(
      competitions => {
        if (competitions.length)
          this.competitions = competitions;
        else
          this.fetchCompetitions();
      }
    ));
  }

  fetchCompetitions() {
    const today = (new Date()).getTime();
    this.competitionsService.listCompetitions().subscribe(
      result => {
        this.competitionsService.competitions.next(result.competitions.filter(
          c => (new Date(c.currentSeason.endDate)).getTime() >= today
          ));
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
