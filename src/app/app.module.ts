import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JeuComponent } from './page/jeu/jeu.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ProfilComponent } from './component/profil/profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassementComponent } from './component/classement/classement.component';

@NgModule({
  declarations: [
    AppComponent,

    JeuComponent,
    ConnexionComponent,
    NavBarComponent,
    ProfilComponent,
    ClassementComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
