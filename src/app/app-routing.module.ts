import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JeuComponent } from './page/jeu/jeu.component';

const routes: Routes = [{ path: 'jeu', component: JeuComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
