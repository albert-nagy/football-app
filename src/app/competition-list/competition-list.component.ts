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
    this.competitionsService.listCompetitions().subscribe(
      result => {
        this.competitions = result.competitions;
        this.competitionsService.competitions.next(this.competitions);
      }
    );
  }

}
