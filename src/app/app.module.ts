import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CompetitionComponent } from './competition/competition.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatchComponent } from './match/match.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionListComponent,
    CompetitionComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
