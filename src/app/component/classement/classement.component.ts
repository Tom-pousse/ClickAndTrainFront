import { Component, EventEmitter, Output } from '@angular/core';
import { Classement } from 'src/app/component/models/classement';
import { Player } from 'src/app/component/models/player';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css'],
})
export class ClassementComponent {
  player!: Player[];
  @Output() valueClassementProfil: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getclassement().subscribe((x) => (this.player = x));
  }
  // la methode qui va envoyer l'info false pour fermer la fenettre
  transmettreValeurClassement() {
    // j'envoie ça
    this.valueClassementProfil.emit(false);
  }
}
