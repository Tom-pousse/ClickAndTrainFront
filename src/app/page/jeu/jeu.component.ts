import { Time } from '@angular/common';
import { Component, Input } from '@angular/core';
import { elementAt, find } from 'rxjs';
import { Acquire } from 'src/app/component/models/acquire';
import { Player } from 'src/app/component/models/player';

import { Upgrade } from 'src/app/component/models/upgrade';

import { PlayerService } from 'src/app/service/player.service';
import { UpgradeService } from 'src/app/service/upgrade.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css'],
})
export class JeuComponent {
  @Input() maValeurDeProfil!: boolean;
  // boolean pour activer le son ou pas
  sonActiver: boolean = true;

  // compteur de click initialisé à zéro
  clickCount: number = 0;

  // compteur d'image initialisé à zéro
  imageIndex: number = 0;

  // pour activer l'animation auto de l'image
  compteurImgAuto: number = 0;

  // le joueur
  player!: Player;

  // total des points du joueur
  totalPoints: number = 0;
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
    private upgradeService: UpgradeService
  ) {}
  ngOnInit(): void {
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      this.totalPoints = this.player.num_score;
      this.clickCount = this.player.num_click;
      // console.log('log de player on init', this.player);
      // console.log('log de totalPoints on init', this.totalPoints);
      // console.log(this.player.acquire);
      this.upgradeService.getUpgrade().subscribe((mesUpgrades) => {
        this.upgrades = mesUpgrades;

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
      });
      this.animAutoByUpgrade();
      this.monTabIm();
      this.savepts();
    });
  }
  monTabIm() {
    this.tableau.forEach((element) => {
      // Pour chaque élément dans "tableau"
      const id = element.id;

      const acquisition = this.player.acquire.find(
        (x) => x.id_upgrade === id && x.num_enable > 0
      );

      if (acquisition) {
        this.selectImg = element.tableau;
      }
    });

    console.log('je log', this.selectImg);
  }

  // methode incrémental
  incrementalZone() {
    this.animationImg();
    this.clickCount += +1;
    this.totalPoints += +1;

    // sauvegarde local des points
    localStorage.setItem('Score', `${this.totalPoints}`);
    this.sonTrain();
  }

  // methode pour changer d'image par click
  animationImg() {
    if (this.imageIndex === this.selectImg.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex = this.imageIndex + 1;
    }
    // sauvegarde local de l'image
    localStorage.setItem('animation', `${this.imageIndex}`);
    this.monTabIm();
  }

  animAutoByUpgrade() {
    if (this.compteurImgAuto === 0) {
      setInterval(() => {
        this.animationImg();
      }, 750);
    }
    this.compteurImgAuto += 1;
  }

  gestionClic(monUpgrade: Upgrade) {
    // recupérer lid, la valeur de l'amélioration
    // console.log('jai cliquer sur', monUpgrade);
    const monIdSelect = this.player.acquire.find(
      (x) => x.id_upgrade === monUpgrade.id_upgrade
    );
    // console.log('je récup', monIdSelect);

    // condition du click id
    if (monUpgrade.id_upgrade === monIdSelect?.id_upgrade) {
      // si mon num-enable est >= 0  et que y a assez de points
      if (
        monIdSelect!.num_enable! > 0 &&
        this.totalPoints > Math.round(monIdSelect!.num_value_upgrade)
      ) {
        this.methodeClicker(monIdSelect!, monUpgrade);
        this.savegardeQuandUpgrade();
        console.log('si > 0', this.player.acquire);
        monUpgrade.num_cost = Math.round(monIdSelect!.num_value_upgrade);
        this.animAutoByUpgrade();
      }
      if (
        monIdSelect!.num_enable! === 0 &&
        this.totalPoints > Math.round(monIdSelect!.num_value_upgrade)
      ) {
        this.methodeClicker(monIdSelect!, monUpgrade);
        this.savegardeQuandUpgrade();
        console.log('si = 0', this.player.acquire);

        monUpgrade.num_cost = Math.round(monIdSelect!.num_value_upgrade);
        this.animAutoByUpgrade();
      }
    }
  }

  savepts() {
    console.log('sauvegarde des points et click ok');
    setInterval(() => {
      this.player.num_score = this.totalPoints;
      this.player.num_click = this.clickCount;
      this.playerService.updateScore(this.player).subscribe({
        next: (response) => {
          response;
        },
        error: (error) => {
          console.log('mon erreur ici ?', error);

          error;
        },
      });
    }, 1000);
  }

  methodeClicker(monIdSelect: Acquire, monUpgrade: Upgrade) {
    monIdSelect!.num_enable! += 1;
    this.totalPoints -= Math.round(monIdSelect!.num_value_upgrade);
    monIdSelect!.num_value_upgrade = Math.round(
      monIdSelect!.num_value_upgrade + monIdSelect!.num_value_upgrade / 10
    );

    setInterval(() => (this.totalPoints += monUpgrade.num_value), 1000);
  }

  savegardeQuandUpgrade() {
    this.playerService.updateScore(this.player).subscribe((response) => {
      console.log('jesave', response);
    });
  }

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

  ActivationDuSon(value: boolean) {
    console.log('La valeur retour', value);
    this.sonActiver = value;
  }
}
