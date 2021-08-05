import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../competitions.service';
import { Competition } from '../models/competition.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {
  competition: Competition;

  constructor(private activatedRoute: ActivatedRoute, private competitionsService: CompetitionsService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      data => {
        this.getCompetition(data.competition_slug);
        console.log(data.competition_slug);
      }
    );
  }

  getCompetition(slug: string) {
    let competitions: Competition[] = this.competitionsService.competitions.getValue();
    if (!competitions.length)
      this.competitionsService.listCompetitions().subscribe(
        result => {
          this.competitionsService.competitions.next(result.competitions);
          this.competition = this.selectCompetition(result.competitions, slug);
        }
      )
    else
      this.competition = this.selectCompetition(competitions, slug);
  }

  selectCompetition(competitions: Competition[], slug: string){
    return competitions.find(c => c.slug == slug);
  }

}
