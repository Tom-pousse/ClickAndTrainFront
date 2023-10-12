import { Time } from '@angular/common';
import { Component } from '@angular/core';
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
  // compteur de click initialisé à zéro
  clickCount = 0;
  imageIndex = 0;

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
  lvlDeMonUpgrade1: number = 0;

  constructor(
    private playerService: PlayerService,
    private upgradeService: UpgradeService
  ) {}
  ngOnInit(): void {
    this.upgradeService.getUpgrade().subscribe((mesUpgrades) => {
      this.upgrades = mesUpgrades;
    });
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      this.totalPoints = this.player.num_score;
    });

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

  savepts() {
    setInterval(() => {
      // console.log(this.totalPoints);
      this.player.num_score = this.totalPoints;
      this.playerService.updateScore(this.player).subscribe({
        next: (response) => {
          response.num_score = this.player.num_score;
          // console.log(' ma response', response);
          // console.log(this.player);
        },
        error: (error) => {
          // console.log('mon erreur', error);

          error;
        },
      });
    }, 1000);
  }

  gestionClic(monUpgrade: Upgrade) {
    // console.log('je click ici', monUpgrade);
    // console.log(this.totalPoints);
    // console.log(this.lvlDeMonUpgrade1);
    if (
      monUpgrade.id_upgrade === 1 &&
      this.totalPoints > monUpgrade.num_cost * (this.lvlDeMonUpgrade1 + 1)
    ) {
      console.log('je rentre');

      console.log(this.lvlDeMonUpgrade1);

      this.totalPoints -=
        monUpgrade.num_cost +
        monUpgrade.num_cost * ((this.lvlDeMonUpgrade1 + 1) / 10);

      console.log(this.totalPoints);
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
    console.log('jincremente');
    this.lvlDeMonUpgrade1++;
    console.log(this.lvlDeMonUpgrade1);

    this.intervalId = Number(
      setInterval(() => {
        this.totalPoints += 1;
      }, 4000)
    );
  }
  train2() {}
  train3() {}
  train4() {}
}
