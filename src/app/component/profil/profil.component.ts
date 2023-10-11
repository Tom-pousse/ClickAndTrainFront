import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  // je creer une transmition de mon enfant vers son parent
  @Output() valueModalProfil: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  // la methode qui va envoyer l'info false pour fermer la fenettre
  transmettreValeurProfil() {
    console.log('profil', this.valueModalProfil.emit(false));

    // j'envoie ça
    this.valueModalProfil.emit(false);
  }
}
