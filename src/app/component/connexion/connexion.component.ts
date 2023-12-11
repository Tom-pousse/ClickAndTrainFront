import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    nom_pseudo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]*$/),
    ]),
    nom_email: new FormControl('', [Validators.required, Validators.email]),
    nom_password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
    num_score: new FormControl(0),
    num_click: new FormControl(0),
  });
  connexion: FormGroup = new FormGroup({
    nom_pseudo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z0-9]*$/),
    ]),
    nom_password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
  });
  pseudoError: string = '';
  emailError: string = '';
  motDePasseError: string = '';
  pseudoError1: string = '';
  motDePasseError1: string = '';

  // je prépare l'envoie
  @Output() valueModalLog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() profil!: Player;
  login: boolean = true;
  registred: boolean = false;

  constructor(private playerService: PlayerService, private router: Router) {}

  onInscription() {
    if (this.inscription.get('nom_password')!.hasError('required')) {
      this.motDePasseError = 'Merci de renseigner un mon de passe. ';
    }

    if (this.inscription.get('nom_password')!.hasError('pattern')) {
      this.motDePasseError =
        'Un mot de passe valide dois comporter 8 caractères, 1 lettre minuscule, 1 lettre majuscule 1 chiffre et 1 caractère spécial.';
    }
    if (this.inscription.get('nom_pseudo')!.hasError('required')) {
      this.pseudoError = 'Merci de renseigner un Pseudo. ';
    }

    if (this.inscription.get('nom_pseudo')!.hasError('pattern')) {
      this.pseudoError =
        'Un pseudo doit comporter Une Majuscule puis des minuscule, maj ou chiffre';
    }

    if (this.inscription.get('nom_email')!.hasError('required')) {
      this.emailError = 'Merci de renseigner un email. ';
    }

    if (this.inscription.get('nom_email')!.hasError('email')) {
      this.emailError = 'Merci de renseigner un email valide.';
    }
    this.playerService
      .inscriptionUtilisateur(this.inscription.value)
      .subscribe({
        next: (response) => {
          this.switchLog();
        },
        error: (error) => {
          if (error.status === 409) {
            this.pseudoError = 'Ce pseudo ou email est déja utilisé';
          }
        },
      });
  }

  // methode au clic
  transmettreValeur() {
    this.valueModalLog.emit(false);
  }

  // inverse les champs log et registred
  switchLog() {
    this.login = !this.login;
    this.registred = !this.registred;
  }

  onLogin() {
    if (this.connexion.get('nom_pseudo')!.hasError('required')) {
      this.pseudoError1 = 'Merci de renseigner un Pseudo. ';
    }

    if (this.connexion.get('nom_pseudo')!.hasError('pattern')) {
      this.pseudoError1 =
        'Un pseudo doit comporter Une Majuscule puis des minuscule, maj ou chiffre';
    }

    if (this.connexion.get('nom_password')!.hasError('required')) {
      this.motDePasseError1 = 'Merci de renseigner un mon de passe. ';
    }

    if (this.connexion.get('nom_password')!.hasError('pattern')) {
      this.motDePasseError1 =
        'Un mot de passe valide dois comporter 8 caractères, 1 lettre minuscule, 1 lettre majuscule, 1 chiffre et 1 caractère spécial.';
    }

    this.playerService.connexionUtilisateur(this.connexion.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['jeu']);
        this.transmettreValeur();
        location.reload();
      },
      error: (error) => {
        if (error.status === 401) {
          this.pseudoError1 = "Ce compte n'existe pas.";
        }
      },
    });
  }

  enleverErreur(x: string) {
    if (x === 'nom_pseudo1') {
      this.pseudoError1 = '';
    }

    if (x === 'nom_password1') {
      this.motDePasseError1 = '';
    }
    if (x === 'nom_email') {
      this.emailError = '';
    }
    if (x === 'nom_pseudo') {
      this.pseudoError = '';
    }

    if (x === 'nom_password') {
      this.motDePasseError = '';
    }
  }
}
