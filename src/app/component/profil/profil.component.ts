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
import { SocketIoService } from 'src/app/service/socket-io.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  player!: Player;

  param!: Param[];

  enable!: Enable;

  // je creer une transmition de mon enfant vers son parent
  @Output() valueModalProfil: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() sonSelectionne: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() animSelectionne: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(
    private playerService: PlayerService,
    private paramService: ParamService,
    private socketService: SocketIoService
  ) {
    this.socketService
      .ecouteDuJoueurDepuisServeur()
      .subscribe((playerData: Player) => {
        this.player.acquire = playerData.acquire;
        console.log("j'ai mis ç jour mon player", this.player, playerData);
      });
  }

  ngOnInit(): void {
    this.paramService.getParam().subscribe((x) => {
      this.param = x;
    });

    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      // console.log(this.player);
      // console.log(
      //   'dans on init player service',
      //   // this.player.enable,
      //   this.player
      // );
      this.initProfil();
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
        console.log(event.target, event);
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

  initProfil() {
    console.log('1');

    if (this.player.enable.length === 0) {
      console.log(
        '2 je vérifie si mon taleau est vide',
        this.player.enable.length
      );

      this.param.forEach((element) => {
        const testid = this.player.enable.find((x) => {
          x.id_param;
        });
        console.log('pouets', element);
        console.log(testid);

        console.log('3, je rentre dans mon foreach log param', this.param);

        if (testid === undefined || testid.id_param !== element.id_param) {
          console.log(
            '4, si jai pas d élément qui corespond à idparam',
            testid?.id_param !== element.id_param
          );
          console.log('log de enable avant le remplissage', this.enable);

          this.enable = {
            id_players: this.player.id_players,
            id_param: element.id_param,
            boo_status: element.boo_status,
          };
          if (this.enable) {
            console.log('log de enable apres le remplissage', this.enable);
            console.log('log de player apres le remplissage', this.player);
            this.player.enable.push(this.enable);
            console.log('5', this.enable);
            console.log('5 enable push dans player', this.player.enable);
          }
        }
      });

      // subscribe({
      //   next: (response) => {
      //     response;
      //     console.log('save', response);
      //   },
      //   error: (error) => {
      //     error;
      //     console.log('pas bon', error);
      //     return;
      //   },
      // });

      console.log('je save mon joueur', this.player);
      this.socketService.envoieDePlayerAuServer(this.player);
    }
  }
}
