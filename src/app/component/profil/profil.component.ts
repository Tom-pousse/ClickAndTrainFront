import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
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

  // je creer une transmition de mon enfant vers son parent
  @Output() valueModalProfil: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  leSonSelectionne: boolean = true;
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
      // console.log(this.player);
    });
    this.paramService.getParam().subscribe((x) => {
      this.param = x;
      // console.log(this.param);
    });
  }

  // création d'un tableau de méthode (pour chaque itération de param une méthode qui corespond)
  choixUser = [
    {
      methode: (event: Event, param: Param) => {
        console.log('methode 1', event, param);

        console.log(event.target);
        const change = event.target as HTMLInputElement;
        change.value;
        console.log(change.value);
        if (change.value === 'true' || undefined) {
          this.animSelectionne.emit(true);
          return;
        }
        this.animSelectionne.emit(false);
      },
    },
    {
      methode: (event: Event, param: Param) => {
        console.log('methode 2', event, param);
        console.log(event.target);
        const change = event.target as HTMLInputElement;
        change.value;
        console.log(change.value);
        if (change.value === 'true' || undefined) {
          this.sonSelectionne.emit(true);
          return;
        }
        this.sonSelectionne.emit(false);
      },
    },
  ];

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
