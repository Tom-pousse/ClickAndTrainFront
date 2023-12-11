import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { SocketIoService } from 'src/app/service/socket-io.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // sert a changer la méthode de rafrichessement de l'information
  //  sert a limité le rafrachissement  des parents ici jeu composant qui avait
  //  une fuite mémoire du au set interval sur le score qui forcais le rafrachissement du composant profils
})
export class ProfilComponent {
  player!: Player;

  param!: Param[];

  enable!: Enable;
  anim: boolean = true;
  son: boolean = true;
  playerParam?: Enable;

  // je creer une transmition de mon enfant vers son parent
  @Output() valueModalProfil: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() sonSelectionne: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() animSelectionne: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(
    private playerService: PlayerService,
    private paramService: ParamService,
    private socketService: SocketIoService,
    private router: Router,
    private cd: ChangeDetectorRef // activation du changedetector pour gérer l'actualisation des données
  ) {
    this.socketService
      .ecouteDuJoueurDepuisServeur()
      .subscribe((playerData: Player) => {
        this.player = playerData;
        if (playerData.enable[1].boo_status === null || undefined) {
          this.son = true;
          this.anim = true;
        }
        this.son = playerData.enable[1].boo_status;
        this.anim = playerData.enable[1].boo_status;
      });
  }

  ngOnInit(): void {
    this.paramService.getParam().subscribe((x) => {
      this.param = [...x];
      this.playerService.getProfil().subscribe((profil) => {
        this.player = { ...profil };
        this.cd.markForCheck();
        // creer un marquer ici pour actualisé l'info en cas de modif
        if (this.player) {
          this.initProfil();
        }
      });
    });
  }

  getBooStatusParam(id: number): boolean {
    if (this.player) {
      this.playerParam = this.player.enable.find((x) => x.id_param == id);
    }
    if (!this.playerParam) {
      return false;
    }

    return this.playerParam.boo_status;
  }

  // création d'un tableau de méthode (pour chaque itération de param une méthode qui corespond)
  choixUser = [
    {
      methode: (event: Event, param: Param) => {
        const change = event.target as HTMLInputElement;
        change.value;
        const idEnable = this.player.enable.find(
          (x) => x.id_param === param.id_param
        );
        if (param.id_param === idEnable?.id_param) {
          if (change.value === 'true' || undefined || null) {
            idEnable.boo_status = true;
            this.anim = true;
            this.socketService.envoieDePlayerAuServer(this.player);
            this.animSelectionne.emit(idEnable.boo_status);
            this.anim = idEnable.boo_status;

            return;
          }
          if (change.value === 'false') {
            idEnable.boo_status = false;
            this.anim = false;
            this.socketService.envoieDePlayerAuServer(this.player);
            this.animSelectionne.emit(idEnable.boo_status);
            this.anim = idEnable.boo_status;

            return;
          }
        }
      },
    },
    {
      methode: (event: Event, param: Param) => {
        const change = event.target as HTMLInputElement;
        change.value;
        const idEnable2 = this.player.enable.find(
          (x) => x.id_param === param.id_param
        );

        if (param.id_param === idEnable2?.id_param) {
          if (change.value === 'true' || undefined || null) {
            idEnable2.boo_status = true;
            this.son = true;
            this.socketService.envoieDePlayerAuServer(this.player);
            this.sonSelectionne.emit(idEnable2.boo_status);
            this.son = idEnable2.boo_status;

            return;
          }
          if (change.value === 'false') {
            idEnable2.boo_status = false;
            this.son = false;
            this.socketService.envoieDePlayerAuServer(this.player);
            this.sonSelectionne.emit(idEnable2.boo_status);
            this.son = idEnable2.boo_status;

            return;
          }
        }
      },
    },
  ];

  // la methode qui va envoyer l'info false pour fermer la fenettre
  transmettreValeurProfil() {
    // j'envoie ça
    this.valueModalProfil.emit(false);
  }

  initProfil() {
    if (this.player.enable.length === 0) {
      this.param.forEach((element) => {
        const testid = this.player.enable.find((x) => {
          x.id_param;
        });
        if (testid === undefined || testid.id_param !== element.id_param) {
          this.enable = {
            id_players: this.player.id_players,
            id_param: element.id_param,
            boo_status: element.boo_status,
          };
          if (this.enable) {
            this.player.enable.push(this.enable);
          }
        }
      });
    }
  }

  suppressionDuJoueur() {
    const supp = this.playerService.delete(this.player).subscribe({
      next: (response) => {
        this.player;
        this.valueModalProfil.emit(false);
        location.reload();
        return;
      },
      error: (error) => {
        return error;
      },
    });
    localStorage.removeItem('token');
  }
}
