import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { Player } from '../models/player';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  // connexion
  inscription: FormGroup = new FormGroup({
    nom_pseudo: new FormControl(''),
    nom_email: new FormControl(''),
    nom_password: new FormControl(''),
    // nom_password_confirme: new FormControl(''),
    num_score: new FormControl(0),
    num_click: new FormControl(0),
  });
  connexion: FormGroup = new FormGroup({
    nom_pseudo: new FormControl(''),
    nom_password: new FormControl(''),
  });

  // je prépare l'envoie
  @Output() valueModalLog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() profil!: Player;
  login: boolean = true;
  registred: boolean = false;

  constructor(private playerService: PlayerService, private router: Router) {}

  onInscription() {
    console.log('mon joueur', this.inscription.value);
    this.playerService
      .inscriptionUtilisateur(this.inscription.value)
      .subscribe({
        next: (response) => {
          // renvoie vers la connection
          this.switchLog();
        },
        error: (error) => {
          console.log(error);

          alert('quelque chose c est mal passé');
        },
      });
  }

  // methode au clic
  transmettreValeur() {
    // j'envoie ça
    console.log('transmition', this.valueModalLog.emit(false));
    this.valueModalLog.emit(false);
  }

  // inverse les champs log et registred
  switchLog() {
    this.login = !this.login;
    this.registred = !this.registred;
  }

  onLogin() {
    console.log(this.connexion.value);
    this.playerService.connexionUtilisateur(this.connexion.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['jeu']);
        this.transmettreValeur();
      },
      error: (error) => {
        alert('quelque chose c est mal passé');
      },
    });
  }
}
