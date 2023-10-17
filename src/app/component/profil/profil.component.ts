import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerService } from 'src/app/service/player.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  player!: Player;
  admin!: boolean;
  // isCheck: boolean = true;
  // je creer une transmition de mon enfant vers son parent
  @Output() valueModalProfil: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() isCheck: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      // Maintenant, this.profilUtilisateur contient les données du profil utilisateur
      console.log(this.player); // Vous pouvez afficher les données ici ou les utiliser pour autre chose
    });
  }
  son(isCheck: boolean) {
    // Faites ce que vous voulez avec la valeur isCheck ici
    console.log('choix : ', isCheck);
    this.isCheck.emit(isCheck);
  }

  // la methode qui va envoyer l'info false pour fermer la fenettre
  transmettreValeurProfil() {
    console.log('profil', this.valueModalProfil.emit(false));

    // j'envoie ça
    this.valueModalProfil.emit(false);
  }
  deconnexion() {
    localStorage.clear();
    location.reload();
  }
}
