import { Time } from '@angular/common';
import { Component } from '@angular/core';
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
  // compteur de click initialisé à zéro
  clickCount: number = 0;

  // compteur d'image initialisé à zéro
  imageIndex: number = 0;

  // les acuire du joueur
  aquisitionRailDuJoueur!: Acquire;

  // je stock mes lvl d'amélioration
  nombreActivationRail: number = 0;
  nombreActivationTrain1: number = 0;
  nombreActivationTrain2: number = 0;
  nombreActivationTrain3: number = 0;
  nombreActivationTrain4: number = 0;
  nombreActivationTrain5: number = 0;
  nombreActivationTrain6: number = 0;
  nombreActivationTrain7: number = 0;
  nombreActivationTrain8: number = 0;
  nombreActivationTrain9: number = 0;

  // je stock mes prix
  prix1: number = 0;
  prix2: number = 0;
  prix3: number = 0;
  prix4: number = 0;
  prix5: number = 0;
  prix6: number = 0;
  prix7: number = 0;
  prix8: number = 0;
  prix9: number = 0;
  prix10: number = 0;

  // le joueur
  player!: Player;

  // total des points du joueur
  totalPoints: number = 0;

  // tableau de lien d'image
  imageFontLvl1 = [
    '../../assets/images/lvl1a.png',
    '../../assets/images/lvl1b.png',
    '../../assets/images/lvl1c.png',
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
      console.log('log de player on init', this.player);
      console.log('log de totalPoints on init', this.totalPoints);
      console.log(this.player.acquire);
    });

    // oui c'est un doulons mais je sépare pour pas faire de bétise de l'appel du dessus
    this.playerService.getProfil().subscribe((profil) => {
      const recupRail = profil.acquire.filter(
        (x) => x.id_upgrade === 1 && x.id_players === this.player.id_players
      );
      console.log('je recup rail', recupRail);

      recupRail.filter(
        (x) => (
          (this.nombreActivationRail = x.num_enable),
          (this.prix1 = x.num_value_upgrade)
        )
      );

      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationRail,
        'et mon prix',
        this.prix1
      );
      // je tente d'initialiser mes améliorations au démarage et leur prix.

      const recupTrain1 = profil.acquire.filter((x) => x.id_upgrade === 2);
      console.log('je recup', recupTrain1);
      recupTrain1.filter(
        (x) => (
          (this.nombreActivationTrain1 = x.num_enable),
          (this.prix2 = x.num_value_upgrade)
        )
      );
      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationTrain1,
        'et mon prix',
        this.prix2
      );

      const recupRaiTrain2 = profil.acquire.filter((x) => x.id_upgrade === 3);
      console.log('je recup', recupRaiTrain2);
      recupRaiTrain2.filter(
        (x) => (
          (this.nombreActivationTrain2 = x.num_enable),
          (this.prix3 = x.num_value_upgrade)
        )
      );
      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationTrain2,
        'et mon prix',
        this.prix3
      );
      const recupRaiTrain3 = profil.acquire.filter((x) => x.id_upgrade === 4);
      console.log('je recup', recupRaiTrain3);
      recupRaiTrain3.filter(
        (x) => (
          (this.nombreActivationTrain3 = x.num_enable),
          (this.prix4 = x.num_value_upgrade)
        )
      );
      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationTrain3,
        'et mon prix',
        this.prix4
      );
      const recupTrain4 = profil.acquire.filter((x) => x.id_upgrade === 5);
      console.log('je recup', recupTrain4);
      recupTrain4.filter(
        (x) => (
          (this.nombreActivationTrain4 = x.num_enable),
          (this.prix5 = x.num_value_upgrade)
        )
      );
      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationTrain4,
        'et mon prix',
        this.prix5
      );
      const recupTrain5 = profil.acquire.filter((x) => x.id_upgrade === 6);
      console.log('je recup', recupTrain5);
      recupTrain5.filter(
        (x) => (
          (this.nombreActivationTrain5 = x.num_enable),
          (this.prix6 = x.num_value_upgrade)
        )
      );
      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationTrain5,
        'et mon prix',
        this.prix6
      );
      const recupTrain6 = profil.acquire.filter((x) => x.id_upgrade === 7);
      console.log('je recup', recupTrain6);
      recupTrain6.filter(
        (x) => (
          (this.nombreActivationTrain6 = x.num_enable),
          (this.prix7 = x.num_value_upgrade)
        )
      );
      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationTrain6,
        'et mon prix',
        this.prix7
      );
      const recupTrain7 = profil.acquire.filter((x) => x.id_upgrade === 8);
      console.log('je recup', recupTrain7);
      recupTrain7.filter(
        (x) => (
          (this.nombreActivationTrain7 = x.num_enable),
          (this.prix8 = x.num_value_upgrade)
        )
      );
      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationTrain7,
        'et mon prix',
        this.prix8
      );
      const recupTrain8 = profil.acquire.filter((x) => x.id_upgrade === 9);
      console.log('je recup', recupTrain8);
      recupTrain8.filter(
        (x) => (
          (this.nombreActivationTrain8 = x.num_enable),
          (this.prix9 = x.num_value_upgrade)
        )
      );
      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationTrain8,
        'et mon prix',
        this.prix9
      );
      const recupTrain9 = profil.acquire.filter((x) => x.id_upgrade === 10);
      console.log('je recup', recupTrain9);
      recupTrain9.filter(
        (x) => (
          (this.nombreActivationTrain9 = x.num_enable),
          (this.prix10 = x.num_value_upgrade)
        )
      );
      console.log(
        'je tente de recup le nombre dactivation',
        this.nombreActivationTrain9,
        'et mon prix',
        this.prix10
      );
    });
    // ------------next-------------
    this.upgradeService.getUpgrade().subscribe((mesUpgrades) => {
      this.upgrades = mesUpgrades;
      console.log('log de upgrades on init', this.upgrades);
    });

    // this.RecupIncrémentationVisuel(this.nombreActivationRail);
    // voir pourquoi le visu ne marche pas ***************************
    // this.savepts();
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
    // recupérer lid, la valeur de l'amélioration
    console.log('jai cliquer sur', monUpgrade);
    console.log(this.nombreActivationRail);

    // condition du click id=1
    if (monUpgrade.id_upgrade === 1) {
      if (
        this.nombreActivationRail > 0 &&
        this.totalPoints >
          Math.round(monUpgrade.num_cost + monUpgrade.num_cost / 10)
      ) {
        // test d'une increentation générique
        this.IncrémentationAuClickGenerique(
          this.nombreActivationRail,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(1);

        // ne plus touché sa marche de L95 à L113 log player! méthode save aquisition
        // j'increment le nombre d'activation

        // -----------zone mise en com pour tester version générique--------
        // this.nombreActivationRail++;
        // -----------------------------------------------------------------
        // jutilise  aquisition du  joueur pour sauvegarder mes informations

        // -----------zone mise en com pour tester version générique--------
        // this.aquisitionRailDuJoueur = {
        //   id_players: this.player.id_players,
        //   id_upgrade: monUpgrade.id_upgrade,
        //   num_enable: this.nombreActivationRail,
        //   num_value_upgrade: monUpgrade.num_cost,
        //   boo_status: true,
        // };
        // console.log(this.aquisitionRailDuJoueur);

        // -----------------------------------------------------------------

        // je push aquisitionRailDuJoueur dans mon tableau d'aquisition

        // -----------zone mise en com pour tester version générique--------
        // this.player.acquire.push(this.aquisitionRailDuJoueur);

        // console.log(this.player);
        // -----------------------------------------------------------------

        // je soustrait le prix au total pts + %

        // -----------zone mise en com pour tester version générique--------
        // this.totalPoints -= monUpgrade.num_cost;
        // -----------------------------------------------------------------
        // ne plus touché au dessus sa marche de L99 à L113 log player!
      }
      console.log('je passe');

      // condition si n'a jamais été activé et que le joueur à les fond
      if (
        this.nombreActivationRail === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        console.log(
          'je rentre dans ma condition si le compteur amelioration = 0'
        );
        this.IncrémentationAuClickGenerique(
          this.nombreActivationRail,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(1);
        // ne plus touché sa marche de L95 à L113 log player! méthode save aquisition
        // j'increment le nombre d'activation

        // -----------zone mise en com pour tester version générique--------
        // this.nombreActivationRail++;
        // -----------------------------------------------------------------

        // jutilise  aquisition du  joueur pour sauvegarder mes informations

        // -----------zone mise en com pour tester version générique--------
        // this.aquisitionRailDuJoueur = {
        //   id_players: this.player.id_players,
        //   id_upgrade: monUpgrade.id_upgrade,
        //   num_enable: this.nombreActivationRail,
        //   num_value_upgrade: Math.round(monUpgrade.num_cost),
        //   boo_status: true,
        // };
        // console.log(this.aquisitionRailDuJoueur);
        // -----------------------------------------------------------------

        // je push aquisitionRailDuJoueur dans mon tableau d'aquisition

        // -----------zone mise en com pour tester version générique--------
        // this.player.acquire.push(this.aquisitionRailDuJoueur);

        // console.log(this.player);
        // -----------------------------------------------------------------

        // je soustrait le prix au total pts

        // -----------zone mise en com pour tester version générique--------
        // this.totalPoints -= Math.round(monUpgrade.num_cost);
        // -----------------------------------------------------------------

        // ne plus touché au dessus sa marche de L99 à L113 log player!

        // -----------zone mise en com pour tester version générique--------
        // this.rail();
        // -----------------------------------------------------------------
      }
    }
    if (monUpgrade.id_upgrade === 2) {
      console.log('vérif', this.player);

      if (
        this.nombreActivationTrain1 > 0 &&
        this.totalPoints >
          Math.round(
            monUpgrade.num_cost +
              (monUpgrade.num_cost / 10) * this.nombreActivationTrain1
          )
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain1,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(4);
        // ne plus touché sa marche de L95 à L113 log player! méthode save aquisition
        // j'increment le nombre d'activation

        // -----------zone mise en com pour tester version générique--------
        // this.nombreActivationTrain1++;
        // -----------------------------------------------------------------

        // jutilise  aquisition du  joueur pour sauvegarder mes informations

        // -----------zone mise en com pour tester version générique--------
        // this.aquisitionRailDuJoueur = {
        //   id_players: this.player.id_players,
        //   id_upgrade: monUpgrade.id_upgrade,
        //   num_enable: this.nombreActivationTrain1,
        //   num_value_upgrade: Math.round(
        //     monUpgrade.num_cost +
        //       (monUpgrade.num_cost / 10) * this.nombreActivationTrain1
        //   ),
        //   boo_status: true,
        // };
        // console.log(this.aquisitionRailDuJoueur);
        // -----------------------------------------------------------------

        // je push aquisitionRailDuJoueur dans mon tableau d'aquisition

        // -----------zone mise en com pour tester version générique--------
        // this.player.acquire.push(this.aquisitionRailDuJoueur);

        // console.log(this.player);
        // -----------------------------------------------------------------

        // je soustrait le prix au total pts + %

        // -----------zone mise en com pour tester version générique--------
        // this.totalPoints -= Math.round(
        //   monUpgrade.num_cost +
        //     (monUpgrade.num_cost * (this.nombreActivationTrain1 - 1)) / 10
        // );
        // -----------------------------------------------------------------

        // ne plus touché au dessus sa marche de L99 à L113 log player!

        // -----------zone mise en com pour tester version générique--------
        // this.train1();
        // -----------------------------------------------------------------
      }

      // condition si n'a jamais été activé et que le joueur à les fond
      if (
        this.nombreActivationTrain1 === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain1,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(4);

        // ne plus touché sa marche de L95 à L113 log player! méthode save aquisition
        // j'increment le nombre d'activation

        // -----------zone mise en com pour tester version générique--------
        // this.nombreActivationTrain1++;
        // -----------------------------------------------------------------

        // jutilise  aquisition du  joueur pour sauvegarder mes informations

        // -----------zone mise en com pour tester version générique--------
        // this.aquisitionRailDuJoueur = {
        //   id_players: this.player.id_players,
        //   id_upgrade: monUpgrade.id_upgrade,
        //   num_enable: this.nombreActivationTrain1,
        //   num_value_upgrade: Math.round(monUpgrade.num_cost),
        //   boo_status: true,
        // };
        // console.log(this.aquisitionRailDuJoueur);
        // -----------------------------------------------------------------

        // je push aquisitionRailDuJoueur dans mon tableau d'aquisition

        // -----------zone mise en com pour tester version générique--------
        // this.player.acquire.push(this.aquisitionRailDuJoueur);

        // console.log(this.player);
        // -----------------------------------------------------------------

        // je soustrait le prix au total pts

        // -----------zone mise en com pour tester version générique--------

        // this.totalPoints -= Math.round(monUpgrade.num_cost);
        // -----------------------------------------------------------------

        // ne plus touché au dessus sa marche de L99 à L113 log player!

        // -----------zone mise en com pour tester version générique--------
        // this.train1();
        // -----------------------------------------------------------------
      }
    }
    if (monUpgrade.id_upgrade === 3) {
      console.log('vérif', this.player);
      // ------------------------------------
      if (
        this.nombreActivationTrain2 > 0 &&
        this.totalPoints >
          Math.round(
            monUpgrade.num_cost +
              (monUpgrade.num_cost / 10) * this.nombreActivationTrain2
          )
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain2,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(20);

        // ne plus touché sa marche de L95 à L113 log player! méthode save aquisition
        // j'increment le nombre d'activation

        // -----------zone mise en com pour tester version générique--------
        // this.nombreActivationTrain2++;
        // -----------------------------------------------------------------

        // jutilise  aquisition du  joueur pour sauvegarder mes informations

        // -----------zone mise en com pour tester version générique--------
        // this.aquisitionRailDuJoueur = {
        //   id_players: this.player.id_players,
        //   id_upgrade: monUpgrade.id_upgrade,
        //   num_enable: this.nombreActivationTrain2,
        //   num_value_upgrade: Math.round(
        //     monUpgrade.num_cost +
        //       (monUpgrade.num_cost / 10) * this.nombreActivationTrain2
        //   ),
        //   boo_status: true,
        // };
        // console.log(this.aquisitionRailDuJoueur);
        // -----------------------------------------------------------------

        // je push aquisitionRailDuJoueur dans mon tableau d'aquisition

        // -----------zone mise en com pour tester version générique--------
        // this.player.acquire.push(this.aquisitionRailDuJoueur);

        // console.log(this.player);
        // -----------------------------------------------------------------

        // je soustrait le prix au total pts + %

        // -----------zone mise en com pour tester version générique--------
        // this.totalPoints -= Math.round(
        //   monUpgrade.num_cost +
        //     (monUpgrade.num_cost * (this.nombreActivationTrain2 - 1)) / 10
        // );
        // -----------------------------------------------------------------

        // ne plus touché au dessus sa marche de L99 à L113 log player!

        // -----------zone mise en com pour tester version générique--------
        // this.train2();
        // -----------------------------------------------------------------
      }

      // condition si n'a jamais été activé et que le joueur à les fond
      if (
        this.nombreActivationTrain2 === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain2,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(20);

        // ne plus touché sa marche de L95 à L113 log player! méthode save aquisition
        // j'increment le nombre d'activation
        // -----------zone mise en com pour tester version générique--------
        // this.nombreActivationTrain2++;
        // -----------------------------------------------------------------
        // jutilise  aquisition du  joueur pour sauvegarder mes informations
        // -----------zone mise en com pour tester version générique--------
        // this.aquisitionRailDuJoueur = {
        //   id_players: this.player.id_players,
        //   id_upgrade: monUpgrade.id_upgrade,
        //   num_enable: this.nombreActivationTrain2,
        //   num_value_upgrade: Math.round(monUpgrade.num_cost),
        //   boo_status: true,
        // };
        // console.log(this.aquisitionRailDuJoueur);
        // -----------------------------------------------------------------
        // je push aquisitionRailDuJoueur dans mon tableau d'aquisition
        // -----------zone mise en com pour tester version générique--------
        // this.player.acquire.push(this.aquisitionRailDuJoueur);
        // console.log(this.player);
        // -----------------------------------------------------------------
        // je soustrait le prix au total pts
        // -----------zone mise en com pour tester version générique--------
        // this.totalPoints -= Math.round(monUpgrade.num_cost);
        // -----------------------------------------------------------------
        // ne plus touché au dessus sa marche de L99 à L113 log player!
        // -----------zone mise en com pour tester version générique--------
        // this.train2();
        // -----------------------------------------------------------------
      }
    }
    if (monUpgrade.id_upgrade === 4) {
      console.log('vérif', this.player);
      if (
        this.nombreActivationTrain3 > 0 &&
        this.totalPoints >
          Math.round(
            monUpgrade.num_cost +
              (monUpgrade.num_cost / 10) * this.nombreActivationTrain3
          )
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain3,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(100);
      }
      if (
        this.nombreActivationTrain3 === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain3,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(100);
      }
    }

    if (monUpgrade.id_upgrade === 5) {
      console.log('vérif', this.player);

      if (
        this.nombreActivationTrain4 > 0 &&
        this.totalPoints >
          Math.round(
            monUpgrade.num_cost +
              (monUpgrade.num_cost / 10) * this.nombreActivationTrain4
          )
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain4,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(550);
      }
      if (
        this.nombreActivationTrain4 === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain4,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(550);
      }
    }

    if (monUpgrade.id_upgrade === 6) {
      console.log('vérif', this.player);

      if (
        this.nombreActivationTrain5 > 0 &&
        this.totalPoints >
          Math.round(
            monUpgrade.num_cost +
              (monUpgrade.num_cost / 10) * this.nombreActivationTrain5
          )
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain5,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(3000);
      }
      if (
        this.nombreActivationTrain5 === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain5,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(3000);
      }
    }
    if (monUpgrade.id_upgrade === 7) {
      console.log('vérif', this.player);

      if (
        this.nombreActivationTrain6 > 0 &&
        this.totalPoints >
          Math.round(
            monUpgrade.num_cost +
              (monUpgrade.num_cost / 10) * this.nombreActivationTrain6
          )
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain6,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(15000);
      }
      if (
        this.nombreActivationTrain6 === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain6,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(15000);
      }
    }
    if (monUpgrade.id_upgrade === 8) {
      console.log('vérif', this.player);

      if (
        this.nombreActivationTrain7 > 0 &&
        this.totalPoints >
          Math.round(
            monUpgrade.num_cost +
              (monUpgrade.num_cost / 10) * this.nombreActivationTrain7
          )
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain7,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(60000);
      }
      if (
        this.nombreActivationTrain7 === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain7,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(60000);
      }
    }
    if (monUpgrade.id_upgrade === 9) {
      console.log('vérif', this.player);

      if (
        this.nombreActivationTrain8 > 0 &&
        this.totalPoints >
          Math.round(
            monUpgrade.num_cost +
              (monUpgrade.num_cost / 10) * this.nombreActivationTrain8
          )
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain8,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(250000);
      }
      if (
        this.nombreActivationTrain8 === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain8,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(250000);
      }
    }
    if (monUpgrade.id_upgrade === 10) {
      console.log('vérif', this.player);

      if (
        this.nombreActivationTrain9 > 0 &&
        this.totalPoints >
          Math.round(
            monUpgrade.num_cost +
              (monUpgrade.num_cost / 10) * this.nombreActivationTrain9
          )
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain9,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(1500000);
      }
      if (
        this.nombreActivationTrain9 === 0 &&
        this.totalPoints > monUpgrade.num_cost
      ) {
        this.IncrémentationAuClickGenerique(
          this.nombreActivationTrain9,
          monUpgrade
        );
        this.methodeIncrementalUpgradeGenerique(1500000);
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

  RecupIncrémentationVisuel(x: number, y: Function) {
    if (x > 0) {
      console.log('je passe dans ma méthode on init pour le score');

      // incrémentation de i qui est égale à 0 jusqu'a la valeur nombre pour lancer la métode autant de fois que le chiffre nombre.
      for (let i = 0; i < x; i++) {
        // le settimeout sur la "référence" de la fonction (une référence = un appel de fonction sans parenthese)
        // boucle for dans une boucle for ...
        // en gros je tourne autant de fois que nombre et je recupère cette valeur pour mettre un interval entre chaque lancement
        // de la méthode rail pour donnée une impression visuel de compteur qui déffile sur le score
        setTimeout(y, i * 10);
      }
    }
  }

  IncrémentationAuClickGenerique(
    compteur: number,
    valueUpgrade: Upgrade
  ): void {
    // j'increment le nombre d'activation
    compteur++;
    // jutilise  aquisition du  joueur pour sauvegarder mes informations
    console.log(compteur);

    this.aquisitionRailDuJoueur = {
      id_players: this.player.id_players,
      id_upgrade: valueUpgrade.id_upgrade,
      num_enable: compteur,
      num_value_upgrade: valueUpgrade.num_cost,
      boo_status: true,
    };
    console.log('mon joueur', this.aquisitionRailDuJoueur);

    // je push aquisitionRailDuJoueur dans mon tableau d'aquisition

    this.playerService.updateLvlUpgrade(this.aquisitionRailDuJoueur).subscribe({
      next: (response) => {
        response;
      },
      error: (error) => {
        console.log('mon erreur ici ?', error);

        error;
      },
    });

    console.log(this.player);
    // je soustrait le prix au total pts + %
    this.totalPoints -= valueUpgrade.num_cost;
    valueUpgrade.num_cost += Math.round(
      (this.aquisitionRailDuJoueur.num_value_upgrade / 100) *
        this.aquisitionRailDuJoueur.num_enable
    );
  }

  methodeIncrementalUpgradeGenerique(nombreAjouter: number): void {
    setInterval(() => {
      this.totalPoints += +nombreAjouter;
    }, 1000);
  }
  train1() {
    setInterval(() => {
      this.totalPoints += +4;
    }, 1000);
  }
  train2() {
    setInterval(() => {
      this.totalPoints += +20;
    }, 1000);
  }
  train3() {
    setInterval(() => {
      this.totalPoints += +100;
    }, 1000);
  }
  train4() {
    setInterval(() => {
      this.totalPoints += +550;
    }, 1000);
  }
  train5() {
    setInterval(() => {
      this.totalPoints += +3000;
    }, 1000);
  }
  train6() {
    setInterval(() => {
      this.totalPoints += +1500;
    }, 1000);
  }
  train7() {
    setInterval(() => {
      this.totalPoints += +60000;
    }, 1000);
  }
  train8() {
    setInterval(() => {
      this.totalPoints += +250000;
    }, 1000);
  }
  train9() {
    setInterval(() => {
      this.totalPoints += +1500000;
    }, 1000);
  }
}
