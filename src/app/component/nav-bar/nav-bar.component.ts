import { Component } from '@angular/core';

import { PlayerService } from 'src/app/service/player.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  // je déclare ma valeur false pour cacher la fenettrre modal
  hideLogModal: boolean = false;
  // je déclare ma valeur false pour cacher la fenettrre modal
  hideProfilModal: boolean = false;

  constructor(private playerService: PlayerService) {}

  // au click je change la valeur en true pour aficher la modal
  openModalProfil() {
    this.hideProfilModal = true;
  }

  // je récupere la valeur false envoyer depuis le composant profil pour fermer la fenetre
  retourDeProfil(valueProfil: boolean) {
    console.log('La valeur retour', valueProfil);
    this.hideProfilModal = valueProfil;
  }

  openModalLog() {
    // ouvrir la modal
    this.hideLogModal = true;
    // console.log(this.hideLogModal);
  }
  // je recupère l'info de login quand la modal ce ferme et la copie dans ma variable hide pour remettre à false
  retourDeLogin(valueLog: boolean) {
    console.log('La valeur retour', valueLog);
    this.hideLogModal = valueLog;
  }
}
