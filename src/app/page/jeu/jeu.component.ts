import { Component } from '@angular/core';
import { Player } from 'src/app/component/models/player';
import { Score } from 'src/app/component/models/score';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css'],
})
export class JeuComponent {
  // compteur de click initialisé à zéro
  clickCount = 0;
  imageIndex = 0;
  pts!: Score;
  player!: Player;
  totalPoints: number = 0;
  // tableau de lien d'image
  imageFontLvl1 = [
    '../../assets/images/lvl1a.png',
    '../../assets/images/lvl1b.png',
    '../../assets/images/lvl1c.png',
  ];

  constructor(private playerService: PlayerService) {}
  ngOnInit(): void {
    this.playerService.getProfil().subscribe((profil) => {
      this.player = profil;
    });
    this.getpts();
    this.pts = {
      num_score: this.clickCount,
    };
    // chargement local des points
    this.clickCount = Number(localStorage.getItem('Score'));

    // chargement local de l'image
    this.imageIndex = Number(localStorage.getItem('animation'));
  }

  // methode incrémental
  incrementalZone() {
    this.animationImg();
    this.clickCount = this.clickCount + 1;

    // sauvegarde local des points
    localStorage.setItem('Score', `${this.clickCount}`);
    this.savepts();
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
    this.pts.num_score = this.clickCount;
    this.playerService.updateScore(this.pts).subscribe({
      next: (response) => {
        console.log('je save');
      },
      error: (error) => {
        error;
      },
    });
  }

  getpts() {
    this.playerService.getProfil().subscribe({
      next: (response) => {
        console.log('je prend');
        this.clickCount = this.player.num_score;
      },
      error: (error) => {
        error;
      },
    });
  }
}
