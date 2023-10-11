import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  // je déclare ma valeur false pour cacher la fenettrre modal
  hideProfilModal: boolean = false;

  // au click je change la valeur en true pour aficher la modal
  openModalProfil() {
    this.hideProfilModal = true;
  }

  // je récupere la valeur false envoyer depuis le composant profil pour fermer la fenetre
  retourDeProfil(valueProfil: boolean) {
    console.log('La valeur retour', valueProfil);
    this.hideProfilModal = valueProfil;
  }
}
