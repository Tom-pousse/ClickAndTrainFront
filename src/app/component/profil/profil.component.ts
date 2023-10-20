import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerService } from 'src/app/service/player.service';
import { Player } from '../models/player';
import { Param } from '../models/param';
import { ParamService } from 'src/app/service/param.service';
import { Enable } from '../models/enable';
import { forkJoin } from 'rxjs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  player!: Player;
  admin!: boolean;
  param!: Param[];
  monProfil!: Enable;
  paramByClick!: Param;
  isChecked1: boolean = true;
  isChecked2: boolean = false;

  // je creer une transmition de mon enfant vers son parent
  @Output() valueModalProfil: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() sonSelectionne: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() animSelectionne: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(
    private playerService: PlayerService,
    private paramService: ParamService
  ) {}

  ngOnInit(): void {
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      console.log(this.player);
    });
    this.paramService.getParam().subscribe((x) => {
      this.param = x;
      console.log(this.param);
    });
  }
  choixUser(param: Param) {
    console.log(param);
    console.log();

    this.sonSelectionne.emit();
  }

  // la methode qui va envoyer l'info false pour fermer la fenettre
  transmettreValeurProfil() {
    // j'envoie ça
    this.valueModalProfil.emit(false);
  }
  deconnexion() {
    localStorage.clear();
    location.reload();
  }

  saveModifProfil(value: boolean) {}
}
