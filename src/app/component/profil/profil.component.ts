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
  @Output() sonSelectionne: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() animSelectionne: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      console.log(this.player);
    });
  }
  son(isSonActive: boolean) {
    console.log('choix : ', isSonActive);
    this.sonSelectionne.emit(isSonActive);
  }

  anim(isAnimActive: boolean) {
    // console.log('choix : ', isAnimActive);
    this.animSelectionne.emit(isAnimActive);
  }

  // la methode qui va envoyer l'info false pour fermer la fenettre
  transmettreValeurProfil() {
    // console.log('profil', this.valueModalProfil.emit(false));

    // j'envoie ça
    this.valueModalProfil.emit(false);
  }
  deconnexion() {
    localStorage.clear();
    location.reload();
  }
}
