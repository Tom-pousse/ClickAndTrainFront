import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { Acquire } from 'src/app/component/models/acquire';
import { Player } from 'src/app/component/models/player';

import { Upgrade } from 'src/app/component/models/upgrade';
import { AcquireService } from 'src/app/service/acquire.service';
import { PlayerService } from 'src/app/service/player.service';
import { UpgradeService } from 'src/app/service/upgrade.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css'],
})
export class JeuComponent {
  // compteur de click initialisé à zéro
  clickCount = 0;
  imageIndex = 0;
  upgradePersoLvl!: Acquire;
  player!: Player;
  totalPoints: number = 0;
  // tableau de lien d'image
  imageFontLvl1 = [
    '../../assets/images/lvl1a.png',
    '../../assets/images/lvl1b.png',
    '../../assets/images/lvl1c.png',
  ];
  intervalId!: number;
  upgrades!: Upgrade[];
  lvlDeMonUpgrade1!: number;
  prixAmelioration1!: number;

  constructor(
    private playerService: PlayerService,
    private upgradeService: UpgradeService,
    private acquireService: AcquireService
  ) {}
  ngOnInit(): void {
    this.upgradeService.getUpgrade().subscribe((mesUpgrades) => {
      this.upgrades = mesUpgrades;
    });
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      this.totalPoints = this.player.num_score;
    });
    this.acquireService.getProfilAcquire().subscribe((acquire) => {
      if (acquire) {
        this.upgradePersoLvl = acquire;

        this.lvlDeMonUpgrade1 = acquire.num_enable;
        console.log('acquire', this.upgradePersoLvl);
      }
    });
    // logique de calcul des upgrade apres recup
    if (this.lvlDeMonUpgrade1 > 0) {
      this.lvlDeMonUpgrade1;
    }
    this.savepts();
  }

  // methode incrémental
  incrementalZone() {
    this.animationImg();
    this.clickCount += +1;
    this.totalPoints += +1;

    // sauvegarde local des points
    localStorage.setItem('Score', `${this.totalPoints}`);
  }

  // methode pour changer d'image par click
  animationImg() {
    if (this.imageIndex === this.imageFontLvl1.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex = this.imageIndex + 1;
    }
    // sauvegarde local de l'image
    localStorage.setItem('animation', `${this.imageIndex}`);
  }

  gestionClic(monUpgrade: Upgrade) {
    this.prixAmelioration1 = monUpgrade.num_cost;
    console.log(this.prixAmelioration1);

    if (
      monUpgrade.id_upgrade === 1 &&
      this.totalPoints >=
        monUpgrade.num_cost +
          monUpgrade.num_cost * (this.lvlDeMonUpgrade1 / 10) &&
      this.upgradePersoLvl.boo_status === true
    ) {
      monUpgrade.num_cost = Math.round(
        this.prixAmelioration1 + this.prixAmelioration1 / 10
      );
      this.totalPoints -= Math.round(monUpgrade.num_cost);

      this.train1();
    }
    if (
      monUpgrade.id_upgrade === 1 &&
      this.totalPoints >= monUpgrade.num_cost &&
      this.upgradePersoLvl.boo_status === false
    ) {
      this.totalPoints -= monUpgrade.num_cost;
      this.upgradePersoLvl.boo_status = true;

      this.train1();
    }
    if (monUpgrade.id_upgrade === 2) {
      this.train2();
    }
    if (monUpgrade.id_upgrade === 3) {
      this.train3();
    }
    if (monUpgrade.id_upgrade === 4) {
      this.train4();
    }
  }

  train1() {
    this.lvlDeMonUpgrade1++;
    this.upgradePersoLvl.num_enable = this.lvlDeMonUpgrade1;
    console.log('mon upgrade pass à =', this.lvlDeMonUpgrade1);
    // this.acquireService.updateUpgradeLvl(this.upgradePersoLvl).subscribe({
    //   next: (response) => {
    //     console.log(' ma response save upgrade', response);
    //   },
    //   error: (error) => {
    //     console.log('mon erreur save upgrade', error);

    //     error;
    //   },
    // });
    this.intervalId = Number(
      setInterval(() => {
        this.totalPoints += 1;
      }, 4000)
    );
  }
  train2() {}
  train3() {}
  train4() {}

  savepts() {
    console.log('mon resultat upgrade si > 0', this.lvlDeMonUpgrade1);
    if (this.lvlDeMonUpgrade1 > 0) {
      this.upgradePersoLvl.num_enable = this.lvlDeMonUpgrade1;
      console.log('mon resultat upgrade si > 0', this.lvlDeMonUpgrade1);

      setInterval(() => {
        this.acquireService.updateUpgradeLvl(this.upgradePersoLvl).subscribe({
          next: (response) => {
            console.log(' ma response save upgrade', response);
          },
          error: (error) => {
            console.log('mon erreur save upgrade', error);

            error;
          },
        });
      }, 1000);
    }
    setInterval(() => {
      // console.log(this.totalPoints);
      this.player.num_score = this.totalPoints;
      this.playerService.updateScore(this.player).subscribe({
        next: (response) => {
          // console.log(' ma response', response);
        },
        error: (error) => {
          // console.log('mon erreur', error);

          error;
        },
      });
    }, 1000);
  }
}
