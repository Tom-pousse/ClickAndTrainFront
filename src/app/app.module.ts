import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './page/accueil/accueil.component';
import { JeuComponent } from './page/jeu/jeu.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ProfilComponent } from './component/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    JeuComponent,
    ConnexionComponent,
    NavBarComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
