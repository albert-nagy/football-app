import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompetitionsService } from '../competitions.service';
import { CompetitionMatches } from '../models/competition-matches.model';
import { Competition } from '../models/competition.model';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  slugs;
  match: Match;
  competition_matches: CompetitionMatches;
  notfound: boolean = false;

  check_interval;

  constructor(
    private activatedRoute: ActivatedRoute,
    private competitionsService: CompetitionsService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      data => this.slugs = data.slugs
    );

    this.subscription.add(this.competitionsService.competition_matches.subscribe(
      compMatch => {
        if (compMatch && compMatch.competition.slug == this.slugs.competition) {
          this.competition_matches = compMatch;
          const match = compMatch.matches.find(m => m.slug == this.slugs.match);
          if (match) {
            this.fetchMatch(match.id);
            if (match.status != 'FINISHED')
              this.check_interval = setInterval(() => {
                this.fetchMatch(match.id);
              }, 60000);
          }
          else
            this.notfound = true;
        }
        else
          this.getCompetition();
      }
    ));
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
        );
    else
      this.selectCompetition(competitions);
  }

  selectCompetition(competitions: Competition[]){
    const competition = competitions.find(c => c.slug == this.slugs.competition);
    const today = this.datePipe.transform(new Date(), 'yyyyMMdd')
    this.competitionsService.listMatches(competition.id).subscribe(
      result => {
        const match_set = result.matches.filter(
          m =>  environment.included_states.includes(m.status) && this.datePipe.transform(new Date(m.utcDate), 'yyyyMMdd') >= today && m.homeTeam.name != null
          );
        this.competitionsService.competition_matches.next({
          competition: competition,
          matches: match_set
        });
      }
    );
  }

  fetchMatch(match_id: number){
    this.competitionsService.getMatch(match_id).subscribe(
      match => {
        this.match = match;
        const live: string = (['LIVE', 'IN_PLAY', 'PAUSED'].includes(match.match.status)) ? 'LIVE!' : '';
        this.competitionsService.setTitle(
          `${live} ${match.match.awayTeam.name} - ${match.match.homeTeam.name} | ${this.competition_matches.competition.name}, ${this.competition_matches.competition.area.name}`
          );
        if (this.check_interval && match.match.status == 'FINISHED')
          clearInterval(this.check_interval);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.check_interval)
          clearInterval(this.check_interval);
  }

}
