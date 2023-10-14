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
      console.log('log de upgrades on init', this.upgrades);
    });
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
      this.totalPoints = this.player.num_score;
      console.log('log de player on init', this.player);
      console.log('log de totalPoints on init', this.totalPoints);
    });
    this.acquireService.getProfilAcquire().subscribe((acquire) => {
      if (acquire) {
        this.upgradePersoLvl = acquire;
        console.log('log de upgradePersoLvl on init', this.upgradePersoLvl);

        this.lvlDeMonUpgrade1 = acquire.num_enable;
        console.log('lvlDeMonUpgrade1', this.lvlDeMonUpgrade1);
        console.log('acquire.num_enable', acquire.num_enable);
      }
    });
    // logique de calcul des upgrade apres recup
    // if (this.lvlDeMonUpgrade1 > 0) {
    //   this.lvlDeMonUpgrade1;
    // }
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
    console.log('le prixAmelioration1', this.prixAmelioration1);

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
      monUpgrade.id_upgrade === 0 &&
      this.totalPoints >= monUpgrade.num_cost &&
      this.upgradePersoLvl.boo_status === true
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
    this.player.acquire.num_enable = this.lvlDeMonUpgrade1;
    console.log('mon upgrade pass à =', this.lvlDeMonUpgrade1);
    console.log(
      'je transfere dans this.player.acquire.num_enable =',
      this.lvlDeMonUpgrade1
    );
    console.log(
      'je vérifie this.player.acquire.num_enable',
      this.player.acquire.num_enable
    );

    this.intervalId = Number(
      setInterval(() => {
        this.totalPoints += 1;
      }, 4000)
    );
    this.saveAmelioration();
  }
  train2() {}
  train3() {}
  train4() {}

  saveAmelioration() {
    this.upgradePersoLvl.num_enable = this.lvlDeMonUpgrade1;
    this.player.acquire = this.upgradePersoLvl;
    console.log('mon resultat upgrade si  0 <', this.lvlDeMonUpgrade1);
    if (this.lvlDeMonUpgrade1 >= 0) {
      console.log('suis-je sup à 0 <', this.lvlDeMonUpgrade1);

      this.playerService.updateLvlUpgrade(this.player.acquire).subscribe({
        next: (response) => {
          console.log(' ma response save acquire', response);
          console.log('?????', this.player.acquire.num_enable);
        },
        error: (error) => {
          console.log('mon erreur save acquire', error);

          error;
        },
      });
    }
  }

  savepts() {
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
