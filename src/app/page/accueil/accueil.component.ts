import { Component, EventEmitter, Output } from '@angular/core';
import { Classement } from 'src/app/component/models/classement';
import { Player } from 'src/app/component/models/player';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  player!: Classement[];
  @Output() valueClassementProfil: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getStat().subscribe((x) => (this.player = x));
  }
  // la methode qui va envoyer l'info false pour fermer la fenettre
  transmettreValeurClassement() {
    console.log('profil', this.valueClassementProfil.emit(false));

    // j'envoie ça
    this.valueClassementProfil.emit(false);
  }
}
