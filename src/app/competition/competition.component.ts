import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompetitionsService } from '../competitions.service';
import { Competition } from '../models/competition.model';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  competition_slug: string;
  competition: Competition;
  empty: boolean = false;
  notfound: boolean = false;
  

  dataSource = new MatTableDataSource<Match>();
  displayedColumns: string[] = [
    'teams',
    'event_time'
  ];

  check_interval;

  constructor(
    private activatedRoute: ActivatedRoute,
    private competitionsService: CompetitionsService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.activatedRoute.data.subscribe(
      data => this.competition_slug = data.competition_slug
    );


    this.subscription.add(this.competitionsService.competition_matches.subscribe(
      compMatch => {
        if (compMatch && compMatch.competition.slug == this.competition_slug) {
          this.competition = compMatch.competition;
          this.competitionsService.setTitle(`${compMatch.competition.name}, ${compMatch.competition.area.name}`);
          this.dataSource.data = compMatch.matches.filter(m => m.status != 'FINISHED');
          if (!this.dataSource.data.length)
            this.empty = true;
          
        }
        else
          this.getCompetition();
      }
    ));
    this.check_interval = setInterval(() => {
      this.fetchMatches();
    }, 60000);
  }

  getCompetition() {
    let competitions: Competition[] = this.competitionsService.competitions.getValue();
    if (!competitions.length)
      this.competitionsService.listCompetitions().subscribe(
        result => {
          const today = (new Date()).getTime();
          const competition_set = result.competitions.filter(c =>  (new Date(c.currentSeason.endDate)).getTime() >= today);
          this.competitionsService.competitions.next(competition_set);
          this.selectCompetition(competition_set);
        }
      )
    else
      this.selectCompetition(competitions);
  }

  selectCompetition(competitions: Competition[]){
    this.competition = competitions.find(c => c.slug == this.competition_slug);
    if (this.competition)
      this.fetchMatches();
    else
      this.notfound = true;
  }

  fetchMatches() {
    if(this.competition) {
      const today = this.datePipe.transform(new Date(), 'yyyyMMdd')
      this.competitionsService.listMatches(this.competition.id).subscribe(
        result => {
          const match_set = result.matches.filter(
            m =>  environment.included_states.includes(m.status) && this.datePipe.transform(new Date(m.utcDate), 'yyyyMMdd') >= today && m.homeTeam.name != null
            );
          this.competitionsService.competition_matches.next({
            competition: this.competition,
            matches: match_set
          });
        }
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.check_interval)
          clearInterval(this.check_interval);
  }
}
