import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TournoisComponent } from './tournois/tournois.component';
import { routeConfig } from './app.routing';
import { ClubsComponent } from './clubs/clubs.component';
import { ResultatsComponent } from './resultats/resultats.component';
import { ReglementComponent } from './reglement/reglement.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    TournoisComponent,
    ClubsComponent,
    ResultatsComponent,
    ReglementComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routeConfig)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
