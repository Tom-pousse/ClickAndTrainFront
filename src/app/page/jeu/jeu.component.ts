import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Acquire } from 'src/app/component/models/acquire';
import { Player } from 'src/app/component/models/player';

import { Upgrade } from 'src/app/component/models/upgrade';
import { AcquireService } from 'src/app/service/acquire.service';
import { PlayerService } from 'src/app/service/player.service';
import { UpgradeService } from 'src/app/service/upgrade.service';
import { SocketIoService } from 'src/app/service/socket-io.service';
import { Param } from 'src/app/component/models/param';
import { ParamService } from 'src/app/service/param.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css'],
})
export class JeuComponent implements OnInit {
  @Input() maValeurDeProfilSon!: boolean;
  @Input() maValeurDeProfilAnim!: boolean;

  intervalId!: any;
  intervalIdPourAnimation: any = false;

  acquire!: Acquire;

  // compteur de click initialisé à zéro
  clickCount: number = 0;
  // total des points du joueur
  totalPoints: number = 0;
  // total de l'incrementation automatique
  totalInc: number = 0;

  // compteur d'image initialisé à zéro
  imageIndex: number = 0;

  // pour activer l'animation auto de l'image
  compteurImgAuto: number = 0;

  // le joueur
  player!: Player;

  // les aquisition du joueur
  playerAcquisition!: Acquire[];
  // monAcquisition!: Acquire;

  selectImg: string[] = [
    '../../assets/images/lvl1a.png',
    '../../assets/images/lvl1b.png',
    '../../assets/images/lvl1c.png',
  ];

  // tableau de tableau d'image
  tableau = [
    {
      id: 2,

      tableau: [
        '../../assets/images/lvl2a.png',
        '../../assets/images/lvl2b.png',
        '../../assets/images/lvl2c.png',
      ],
    },
    {
      id: 3,

      tableau: [
        '../../assets/images/lvl3a.png',
        '../../assets/images/lvl3b.png',
        '../../assets/images/lvl3c.png',
      ],
    },
    {
      id: 4,

      tableau: [
        '../../assets/images/lvl4a.png',
        '../../assets/images/lvl4b.png',
        '../../assets/images/lvl4c.png',
      ],
    },
    {
      id: 5,

      tableau: [
        '../../assets/images/lvl5a.png',
        '../../assets/images/lvl5b.png',
        '../../assets/images/lvl5c.png',
      ],
    },
    {
      id: 6,

      tableau: [
        '../../assets/images/lvl6a.png',
        '../../assets/images/lvl6b.png',
        '../../assets/images/lvl6c.png',
      ],
    },
    {
      id: 7,

      tableau: [
        '../../assets/images/lvl7a.png',
        '../../assets/images/lvl7b.png',
        '../../assets/images/lvl7c.png',
      ],
    },
    {
      id: 8,

      tableau: [
        '../../assets/images/lvl8a.png',
        '../../assets/images/lvl8b.png',
        '../../assets/images/lvl8c.png',
      ],
    },
    {
      id: 9,

      tableau: [
        '../../assets/images/lvl9a.png',
        '../../assets/images/lvl9b.png',
        '../../assets/images/lvl9c.png',
      ],
    },
    {
      id: 10,

      tableau: [
        '../../assets/images/lvl10a.png',
        '../../assets/images/lvl10b.png',
        '../../assets/images/lvl10c.png',
      ],
    },
  ];

  // je récupère mes upgrades ici
  upgrades!: Upgrade[];
  // une copie pour avoir toujours la valeur de base à modifier
  copieUpgrade!: Upgrade[];

  params!: Param[];
  enModePaysage: boolean = false; // Variable pour suivre l'état de l'orientation

  // @HostListener('window:orientationchange', ['$event'])
  // onOrientationChange(event: Event) {
  //   this.verifierOrientation();
  // }

  // verifierOrientation() {
  //   // fonction de test pour voir la tailler via inner

  //   console.log('linfo de window ', window);

  //   this.enModePaysage = window.matchMedia('(orientation: landscape)').matches;

  //   const tourner = "Tourner l'ecran pour jouer";

  //   if (!this.enModePaysage && window.screen.width > 600) {
  //     console.log('mode paysage');
  //     // Ici, vous pouvez modifier une variable pour afficher le message dans votre template
  //     // Par exemple : this.messageAAfficher = "Veuillez passer en mode paysage pour une meilleure expérience.";
  //     return;
  //   } else {
  //     // Cacher le message
  //     console.log('pas mode paysage');

  //     return tourner;
  //   }
  // }
  constructor(
    private playerService: PlayerService,
    private upgradeService: UpgradeService,
    private acquireService: AcquireService,
    private socketIoService: SocketIoService,
    private paramService: ParamService
  ) {
    // je recoie mes info du joueur à jour

    this.socketIoService
      .ecouteDuJoueurDepuisServeur()
      .subscribe((playerData: Player) => {
        this.player.acquire = playerData.acquire;
        // console.log("j'ai mis à jour mon player", this.player, playerData);
        this.player = playerData;
        this.activationDuSon();
        this.animAutoByUpgrade();
      });
  }
  ngOnInit(): void {
    this.paramService.getParam().subscribe((mesParam) => {
      this.params = mesParam;
    });
    this.upgradeService.getUpgrade().subscribe((mesUpgrades) => {
      this.copieUpgrade = [...mesUpgrades];
    });
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      this.acquireService.getAcquire().subscribe((mesAcquires) => {
        this.playerAcquisition = mesAcquires;
        // console.log(this.player.acquire);
      });

      this.upgradeService.getUpgrade().subscribe((mesUpgrades) => {
        this.upgrades = [...mesUpgrades];

        this.recupDuPrixAuDemarage();
        // const upgrade = this.upgrades.find((x) => x.num_value);
        this.incrementationParSetIntrval();

        this.monTabIm();
        this.animationImg();
        this.activationDuSon();
        this.animAutoByUpgrade();
      });
    });

    this.calculDuTotalIncAuto();
    localStorage.getItem('animation');

    // console.log('ici', this.player);
  }

  // ------------ methode incrémental
  incrementalZone() {
    this.animationImg();
    this.player.num_score += 1;
    this.player.num_click += 1;
    this.sonTrain();

    // console.log(this.player);
    this.socketIoService.envoieDePlayerAuServer(this.player);
    console.log('eeeee');
  }
  animationImg() {
    this.monTabIm();
    if (this.maValeurDeProfilAnim === false) {
      this.imageIndex = 1;
      return;
    }
    if (this.imageIndex === this.selectImg.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex = this.imageIndex + 1;
    }
  }

  // voir pour mettre cette condition si désactiver l'animation
  // if (this.maValeurDeProfilAnim === true || undefined) {
  // } else this.imageIndex = 1;
  // et ne pas oublier le clearInterval(this.intervalIdPourAnimation);

  //-------------- méthode pour le son au click
  sonTrain() {
    const sonTrainClic = document.getElementById(
      'audioElement'
    ) as HTMLAudioElement;
    // currentTime permet de relancer le son à 0
    if (sonTrainClic) {
      sonTrainClic.currentTime = 0;
      // playbackRate permet d'accelerer la vitesse du son
      sonTrainClic.playbackRate = 2;
      sonTrainClic.play();
      // console.log('jenvoie mon son');
    }
  }

  // méthode d'activation != ? du son
  activationDuSon() {
    if (this.params) {
      const monParam = this.params.find((x) => x.nom_label === 'son');
      // console.log(this.params.find((x) => x.nom_label === 'son'));
      const monIdParam = this.player.enable.find(
        (x) => x.id_param === monParam?.id_param
      );
      // console.log('test', monIdParam);

      // this.player.enable.find();
      if (monIdParam) {
        this.maValeurDeProfilSon! = monIdParam.boo_status;
        return;
      }
      if (this.maValeurDeProfilSon === undefined) {
        this.maValeurDeProfilSon = true;
        return;
      }
    }
  }

  // methode d'incrémentation via set interval amélioré
  // ---------------- a finir mais l'idée de base est la
  incrementationParSetIntrval() {
    this.calculDuTotalIncAuto();
    // Effacer l'intervalle précédent s'il existe
    if (this.intervalId !== null || this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.player.num_score =
          Math.round((this.player.num_score + this.totalInc / 5) * 10) / 10;
      }, 200);
      return;
    }
    this.intervalId = setInterval(() => {
      this.player.num_score =
        Math.round((this.player.num_score + this.totalInc / 5) * 10) / 10;
    }, 200);
  }

  // methode quand je click sur mes upgrade
  gestionClic(monUpgrade: Upgrade) {
    //
    const monIdSelect = this.player.acquire.find(
      (x) => x.id_upgrade === monUpgrade.id_upgrade
    );

    let valeurUpgradeDeBase = this.copieUpgrade.find(
      (x) => x.id_upgrade === monUpgrade.id_upgrade
    );

    if (
      monIdSelect &&
      monIdSelect.id_upgrade === monUpgrade.id_upgrade &&
      this.player.num_score >= monUpgrade.num_cost
    ) {
      // console.log('jai trouver un id');
      monIdSelect.num_lvl = monIdSelect.num_lvl + 1;
      // console.log('mon lvl mis a jour', monIdSelect, this.player);

      monUpgrade.num_cost = Math.round(
        valeurUpgradeDeBase!.num_cost +
          (valeurUpgradeDeBase!.num_cost * (monIdSelect.num_lvl - 1)) / 10
      );
      monUpgrade.num_value = Math.round(
        valeurUpgradeDeBase!.num_value * monIdSelect!.num_lvl
      );
      this.player.num_score = Math.round(
        this.player.num_score - monUpgrade.num_cost
      );
      //  this.socketIoService.envoieDePlayerAcquisitionAuServer(this.player);
      this.socketIoService.envoieDePlayerAuServer(this.player);
      this.incrementationParSetIntrval();

      return;
    }
    if (
      monIdSelect === undefined &&
      this.player &&
      this.player.num_score >= monUpgrade.num_cost
    ) {
      // console.log("je n'ai pas trouver id");

      this.acquire = {
        id_players: this.player.id_players,
        id_upgrade: monUpgrade.id_upgrade,
        num_lvl: 2,
      };
      this.player.acquire.push(this.acquire);
      this.player.num_score = Math.round(
        this.player.num_score - monUpgrade.num_cost
      );
      // console.log(
      //   'je creer une acquisition du joueur dans acquire via update en pushant directement dans le player',
      //   this.acquire
      // );
      // console.log('je push dans player', this.player);

      monUpgrade.num_cost = Math.round(
        valeurUpgradeDeBase!.num_cost + valeurUpgradeDeBase!.num_cost / 10
      );
      monUpgrade.num_value = Math.round(
        monUpgrade.num_value * this.acquire.num_lvl
      );
      //  this.socketIoService.envoieDePlayerAcquisitionAuServer(this.player);
      this.socketIoService.envoieDePlayerAuServer(this.player);
      this.incrementationParSetIntrval();
      return;
    }
  }

  animAutoByUpgrade() {
    if (this.params) {
      const monAnimationParam = this.params.find(
        (x) => x.nom_label === 'animation'
      );
      const monAnim = this.player.enable.find(
        (x) => x.id_param === monAnimationParam?.id_param
      );
      // console.log('test mon anim', monAnim);
      if (monAnim) {
        this.maValeurDeProfilAnim = monAnim!.boo_status;
      }

      const jeTestsiAcquire = this.player.acquire.find((x) => x.id_upgrade);

      if (this.maValeurDeProfilAnim === false) {
        clearInterval(this.intervalIdPourAnimation);
        this.animationImg();
      }
      if (
        this.maValeurDeProfilAnim === true ||
        (this.maValeurDeProfilAnim === undefined &&
          jeTestsiAcquire !== undefined)
      ) {
        clearInterval(this.intervalIdPourAnimation);
        // console.log('test anim on', this.maValeurDeProfilAnim);

        this.intervalIdPourAnimation = setInterval(() => {
          this.animationImg();
        }, 750);
        return;
      }
    }
  }

  monTabIm() {
    this.tableau.forEach((element) => {
      // Pour chaque élément dans "tableau"
      const id = element.id;
      if (this.player.acquire) {
        const acquisition = this.player.acquire.find(
          (x) => x.id_upgrade === id && x.num_lvl > 0
        );
        if (acquisition) {
          this.selectImg = element.tableau;
        }
      }
    });
    // console.log('je log', this.selectImg);
  }

  recupDuPrixAuDemarage() {
    if (this.upgrades && this.player.acquire) {
      this.upgrades.forEach((upgrade) => {
        const comparaison = this.player.acquire.find(
          (acquisition) => acquisition.id_upgrade === upgrade.id_upgrade
        );

        if (comparaison) {
          upgrade.num_cost =
            upgrade.num_cost + (upgrade.num_cost / 10) * comparaison.num_lvl;
          upgrade.num_value = upgrade.num_value * comparaison.num_lvl;
          return;
        }
      });
    }
  }

  // je calcul le total des amélioration du joueur pour les lancer dans set interval et au démarage
  calculDuTotalIncAuto(): void {
    this.totalInc = 0;
    if (this.player) {
      for (const AcquisitionDuJoueur of this.player.acquire) {
        let testId = this.upgrades.find(
          (x) => x.id_upgrade === AcquisitionDuJoueur.id_upgrade
        );
        // console.log('si jai ça', testId?.id_upgrade);
        if (testId) {
          testId.num_value;
          // console.log(testId.num_value, testId);

          this.totalInc += testId.num_value;
          // console.log('aaa', this.totalInc);
        }
      }
    }
  }
  save() {
    setInterval(() => {
      // console.log('saveTime');
      this.socketIoService.envoieDePlayerAuServer(this.player);
    }, 1000);
  }
}
