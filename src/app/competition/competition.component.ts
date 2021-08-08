import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CompetitionsService } from '../competitions.service';
import { Competition } from '../models/competition.model';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {
  competition: Competition;
  empty: boolean = false;

  dataSource = new MatTableDataSource<Match>();
  displayedColumns: string[] = [
    'teams',
    'event_time'
  ];

  constructor(private activatedRoute: ActivatedRoute, private competitionsService: CompetitionsService) { }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.activatedRoute.data.subscribe(
      data => {
        this.getCompetition(data.competition_slug);
      }
    );
  }

  getCompetition(slug: string) {
    let competitions: Competition[] = this.competitionsService.competitions.getValue();
    if (!competitions.length)
      this.competitionsService.listCompetitions().subscribe(
        result => {
          const today = (new Date()).getTime();
          const competition_set = result.competitions.filter(c =>  (new Date(c.currentSeason.endDate)).getTime() >= today);
          this.competitionsService.competitions.next(competition_set);
          this.selectCompetition(competition_set, slug);
        }
      )
    else
      this.selectCompetition(competitions, slug);
  }

  selectCompetition(competitions: Competition[], slug: string){
    this.competition = competitions.find(c => c.slug == slug);
    this.competitionsService.listMatches(this.competition.id).subscribe(
      result => {
        const match_set = result.matches.filter(m =>  environment.included_states.includes(m.status));
        this.dataSource.data = match_set;
        this.competitionsService.competition_matches.next({
          competition: this.competition,
          matches: match_set
        });
        if (!this.dataSource.data.length)
          this.empty = true;
      }
    )
  }



}
