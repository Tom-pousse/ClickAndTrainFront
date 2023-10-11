import { Component } from '@angular/core';
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

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getStat().subscribe((x) => (this.player = x));
  }
}
