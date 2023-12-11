import { Component } from '@angular/core';

import { PlayerService } from 'src/app/service/player.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  // je stock la valeur de 'radio son' de profil pour la transmettre à jeu
  valeurPourJeuDuSon!: boolean;
  // je stock la valeur de 'radio anim' profil pour la transmettre à jeu
  valeurPourJeuDeAnim!: boolean;
  // je déclare ma valeur false pour cacher la fenettrre modal log
  hideLogModal: boolean = false;
  // je déclare ma valeur false pour cacher la fenettrre modal profil
  hideProfilModal: boolean = false;
  // je déclare ma valeur false pour cacher la fenettrre modal classement
  hideClassementModal: boolean = false;

  player!: Player;

  constructor(private playerService: PlayerService) {
    this.playerService.getProfil().subscribe((x) => {
      this.player = x;
    });
  }
  deconnexion() {
    localStorage.clear();
    location.reload();
  }
  // au click je change la valeur en true pour aficher la modal
  openModalProfil() {
    this.hideProfilModal = true;
  }

  // je récupere la valeur false envoyer depuis le composant profil pour fermer la fenetre
  retourDeProfil(valueProfil: boolean) {
    this.hideProfilModal = valueProfil;
  }

  openModalLog() {
    // ouvrir la modal
    this.hideLogModal = true;
  }
  // je recupère l'info de login quand la modal ce ferme et la copie dans ma variable hide pour remettre à false
  retourDeLogin(valueLog: boolean) {
    this.hideLogModal = valueLog;
  }
  openModalClassement() {
    this.hideClassementModal = true;
  }

  // je recupère l'info de classement quand la modal ce ferme et la copie dans ma variable hide pour remettre à false
  retourDeClassement(valueLog: boolean) {
    this.hideClassementModal = valueLog;
  }

  // je recup la valeur de profil pour la transmettre à jeu
  infoPourJeuDuSon(valueLog: boolean) {
    this.valeurPourJeuDuSon = valueLog;
  }

  infoPourJeuDeAnim(valueLog: boolean) {
    this.valeurPourJeuDeAnim = valueLog;
  }
}
