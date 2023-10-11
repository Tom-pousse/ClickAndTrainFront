import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './page/accueil/accueil.component';
import { JeuComponent } from './page/jeu/jeu.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'jeu', component: JeuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
