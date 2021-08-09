import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource = new MatTableDataSource<Competition>();
  displayedColumns: string[] = [
    'name',
    'area'
  ];

  constructor(private competitionsService: CompetitionsService) { }

  ngOnInit(): void {
    this.competitionsService.setTitle('Competitions');
    this.subscription.add(this.competitionsService.competitions.subscribe(
      competitions => {
        if (competitions.length)
        this.dataSource.data = competitions;
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
