import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JeuComponent } from './page/jeu/jeu.component';
import { ConnexionComponent } from './component/connexion/connexion.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'jeu', component: JeuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
