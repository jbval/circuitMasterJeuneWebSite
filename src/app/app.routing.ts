import {  Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TournoisComponent } from './tournois/tournois.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ResultatsComponent } from './resultats/resultats.component';
import { ReglementComponent } from './reglement/reglement.component';

export const routeConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'tournois',
    component: TournoisComponent
  },
  {
    path: 'clubs',
    component: ClubsComponent
  },
  {
    path: 'resultats',
    component: ResultatsComponent
  },
  {
    path: 'reglement',
    component: ReglementComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
