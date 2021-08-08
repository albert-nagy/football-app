import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
    'status',
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
          const competition_set = result.competitions.filter(c => c.plan === 'TIER_ONE');
          this.competitionsService.competitions.next(competition_set);
          this.selectCompetition(competition_set, slug);
        }
      )
    else
      this.selectCompetition(competitions, slug);
  }

  selectCompetition(competitions: Competition[], slug: string){
    this.competition = competitions.find(c => c.slug == slug);
    const included_states = ['SCHEDULED', 'LIVE', 'IN_PLAY', 'PAUSED'];
    this.competitionsService.listMatches(this.competition.id).subscribe(
      result => {
        this.dataSource.data = result.matches.filter(m =>  included_states.includes(m.status) );
        if (!this.dataSource.data.length)
          this.empty = true;
      }
    )
  }



}
