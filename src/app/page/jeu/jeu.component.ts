import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Acquire } from 'src/app/component/models/acquire';
import { AcquirePatch } from 'src/app/component/models/acquirePatch';
import { Player } from 'src/app/component/models/player';
import { forkJoin } from 'rxjs';
import { Upgrade } from 'src/app/component/models/upgrade';
import { AcquireService } from 'src/app/service/acquire.service';
import { PlayerService } from 'src/app/service/player.service';
import { UpgradeService } from 'src/app/service/upgrade.service';
import { PlayerScore } from 'src/app/component/models/playerScore';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css'],
})
export class JeuComponent {
  @Input() maValeurDeProfilSon!: boolean;
  @Input() maValeurDeProfilAnim!: boolean;
  testDeId!: boolean;

  acquire!: Acquire;

  // compteur de click initialisé à zéro
  clickCount: number = 0;
  // total des points du joueur
  totalPoints: number = 0;
  MonEnvoieDeScore!: PlayerScore;

  // compteur d'image initialisé à zéro
  imageIndex: number = 0;

  // pour activer l'animation auto de l'image
  compteurImgAuto: number = 0;

  // le joueur
  player!: Player;

  // les aquisition du joueur
  playerAcquisition!: Acquire[];
  monAcquisition!: Acquire;
  monAcquisitionPourPatch!: AcquirePatch;

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

  constructor(
    private playerService: PlayerService,
    private upgradeService: UpgradeService,
    private acquireService: AcquireService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;

      console.log('log de player on init', this.player.num_score);
      // console.log('log de totalPoints on init', this.totalPoints);
      // console.log(this.player.acquire);
      this.upgradeService.getUpgrade().subscribe((mesUpgrades) => {
        this.upgrades = mesUpgrades;

        this.acquireService.getAcquire().subscribe((mesAcquires) => {
          this.playerAcquisition = mesAcquires;
          // console.log('log de mesAcquires', mesAcquires);
        });

        // tentative pour récupérer les valeur on init en front
        // if (this.upgrades && this.player) {
        //   this.upgrades!.forEach((coresspondanceId) => {
        //     // Rechercher l'élément correspondant dans le tableau Y
        //     const tst = this.player!.acquire.find(
        //       (x) => x.id_upgrade === coresspondanceId.id_upgrade
        //     );

        //     // Si un élément correspondant est trouvé, mettre à jour X.valeur
        //     if (tst) {
        //       coresspondanceId.num_cost = tst.num_value_upgrade;
        //     }
        //     // console.log( coresspondanceId)
        //   });
        // }
        this.ActivationDuSon();
        this.animationImg();
        this.monTabIm();
        // this.savepts();
        localStorage.getItem('animation');
      });
    });
  }

  // methode incrémental
  incrementalZone() {
    this.animationImg();
    this.player.num_score += 1;
    this.player.num_click += 1;

    // sauvegarde local des points
    localStorage.setItem('Score', `${this.player.num_score}`);
    this.sonTrain();
  }
  animationImg() {
    // voir pour mettre cette condition si désactiver l'animation
    // if (this.maValeurDeProfilAnim === true || undefined) {
    // } else this.imageIndex = 1;

    if (this.imageIndex === this.selectImg.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex = this.imageIndex + 1;
    }
    // sauvegarde local de l'image
    localStorage.setItem('animation', `${this.imageIndex}`);
    this.monTabIm();
  }

  // méthode pour le son au click
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
      console.log('jenvoie mon son');
    }
  }

  // méthode d'activation != ? du son
  ActivationDuSon() {
    console.log('La valeur retour', this.maValeurDeProfilSon);
    if (this.maValeurDeProfilSon === undefined) {
      this.maValeurDeProfilSon = true;
    } else {
      console.log('non je reste la');
    }
  }

  // methode quand je click sur mes upgrade
  gestionClic(monUpgrade: Upgrade) {
    this.cdr.detectChanges();
    this.playerService.getProfil().subscribe((x) => {
      const mesAcquisitions = x.acquire;
      this.player = x;
      // recupérer lid, la valeur de l'amélioration
      this.testDeId = mesAcquisitions.some(
        (item) => item.id_upgrade === monUpgrade.id_upgrade
      );
      const monIdSelect = mesAcquisitions.find(
        (x) => x.id_upgrade === monUpgrade.id_upgrade
      );

      if (this.testDeId === false) {
        // console.log('je rentre');

        this.monAcquisition = {
          id_players: this.player!.id_players,
          id_upgrade: monUpgrade!.id_upgrade,
          nom_name: monUpgrade.nom_name,
          num_cost: monUpgrade.num_cost,
          num_value: monUpgrade.num_value,
          num_lvl: monUpgrade.num_lvl + 1,
        };

        this.acquireService
          .createAcquire(this.monAcquisition)
          .subscribe((response) => {
            console.log(
              'voila mon create acquire DE PUTIN DE FACON DINAMIQUE',

              response
            );
          });
      } else {
        // console.log(
        //   'je dois maintenant faire la méthode pour incrémenté et rajouter le compteur lvl dans mon if et mon else'
        // );
        if (monIdSelect?.id_upgrade === monUpgrade.id_upgrade) {
          // console.log(
          //   "je suis content parce que j'ai passer la putin de journé pour ne plus avoir mes valeurs en dur à l'initialisation et donc je JOUIIIIIIIIIIIEEEEEEEEEEEEEEEEEEEEEEEEEEEEE DE BONHEURR"
          // );

          this.monAcquisition = {
            id_players: this.player!.id_players,
            id_upgrade: monUpgrade!.id_upgrade,
            nom_name: monUpgrade.nom_name,
            num_cost: monIdSelect.num_cost + monUpgrade.num_cost / 10,
            num_value: monIdSelect.num_value + monUpgrade.num_value,
            num_lvl: monIdSelect.num_lvl + 1,
          };

          this.acquireService
            .updateAcquire(this.monAcquisition)
            .subscribe((response) => {
              console.log('voila mon update', response);
            });
          console.log('a', this.player.num_score);
          console.log(monIdSelect.num_cost, monUpgrade.num_cost / 10);

          this.MonEnvoieDeScore.num_score =
            this.player.num_score - this.monAcquisition.num_cost;
          this.playerService
            .updateScore(this.MonEnvoieDeScore)
            .subscribe((response) => {
              console.log(response);
              if (response) {
                this.player.num_score =
                  this.player.num_score - this.monAcquisition.num_cost;
              }
            });
        }
      }
    });
  }

  animAutoByUpgrade() {
    setInterval(() => {
      this.animationImg();
    }, 750);
  }

  monTabIm() {
    this.tableau.forEach((element) => {
      // Pour chaque élément dans "tableau"
      const id = element.id;

      const acquisition = this.player.acquire.find(
        (x) => x.id_upgrade === id && x.num_lvl > 0
      );

      if (acquisition) {
        this.selectImg = element.tableau;
      }
    });

    console.log('je log', this.selectImg);
  }
}
