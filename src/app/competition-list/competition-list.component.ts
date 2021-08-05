import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from '../competitions.service';
import { Competition } from '../models/competition.model';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit {
  competitions: Competition[];

  constructor(private competitionsService: CompetitionsService) { }

  ngOnInit(): void {
    this.competitionsService.competitions.subscribe(
      competitions => {
        if (competitions.length)
          this.competitions = competitions;
        else
          this.fetchCompetitions();
      }
    )  
  }

  fetchCompetitions() {
    this.competitionsService.listCompetitions().subscribe(
      result => {
        this.competitionsService.competitions.next(result.competitions.filter(c => c.plan === 'TIER_ONE'));
      }
    );
  }

}
