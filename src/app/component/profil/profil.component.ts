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
  // je creer une transmition de mon enfant vers son parent
  @Output() valueModalProfil: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      // Maintenant, this.profilUtilisateur contient les données du profil utilisateur
      console.log(this.player); // Vous pouvez afficher les données ici ou les utiliser pour autre chose
    });
  }

  // la methode qui va envoyer l'info false pour fermer la fenettre
  transmettreValeurProfil() {
    console.log('profil', this.valueModalProfil.emit(false));

    // j'envoie ça
    this.valueModalProfil.emit(false);
  }
}
