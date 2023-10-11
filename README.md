# Front click-Train

## Etape 1 : lancer un nouveau projet angular :

```bash
ng new click-train-front
```

## Etape 2 : créer des pages et des composants :

```bash
ng generate component component/...
ng generate component page/...
```

## Etape 3 : import de reactiveForms et HttpClient dans appModule :

```bash
imports: [
ReactiveFormsModule,
HttpClientModule,
],
```

## Etape 4 : mise en place nav bar :

```
dans mon app component html :
```

```bash
<app-nav-bar></app-nav-bar>
```

```
dans mon html de la nav bar :
```

```bash
<div class="navbar">
  <a href="">Accueil</a>
</div>
```

## Etape 5 : creation modal :

```
html
```

```bash
<div>

  <div class="modal" *ngIf="">
    <div class="modal-content">

      <form [formGroup]="" (ngSubmit)="">
        <h2>Connexion</h2>
        <div>
          <label for="">x:</label>
          <input
            type=""
            id=""
            name=""
            formControlName=""
          />
        </div>
        <div>
          <label for="">x:</label>
          <input
            type=""
            id=""
            name=""
            formControlName=""
          />
        </div>
        <div>

          <button (click)="">Fermer</button>
          <button type="submit">Connexion</button>
        </div>
      </form>
      <div>

        <button (click)="">Pas encore inscrit ?</button>
      </div>
    </div>
  </div>

  <div class="modal" *ngIf="">
    <div class="modal-content">

      <form [formGroup]="" (ngSubmit)="">
        <h2>Inscription</h2>
        <div>
          <label for="">x :</label>
          <input
            type=""
            id=""
            name=""
            formControlName=""
          />
        </div>
        <div>
          <label for="">x :</label>
          <input
            type=""
            id=""
            name=""
            formControlName=""
          />
        </div>
        <div>
          <label for="">x:</label>
          <input
            type=""
            id=""
            name=""
            formControlName=""
          />
        </div>

        <div>

          <button >Fermer</button>
          <button type="submit">Connexion</button>
        </div>

      </form>
    </div>

  </div>
</div>
```

```
css
```

```bash
/* modal.component.css */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  display: flex;
  text-align: center;
  justify-content: center;

  font-size: x-large;
  font-weight: 500;
  border-radius: 2rem;
  background-color: hsl(187, 20%, 80%);
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 250px;
  position: fixed;
}
```

## Etape 6 : logique ouverture fermeture modal :

```
dans ma navbar:
```

```
html
```

<a (click)="openModalProfil()">Profil</a>
<app-profil
(valueModalProfil)="retourDeProfil($event)"
\*ngIf="hideProfilModal"

> </app-profil>

```
dans mon ts navbar
```

```bash
// je déclare ma valeur false pour cacher la fenettrre modal
hideLogModal: boolean = false;
  openModalProfil() {
    this.hideProfilModal = true;
  }

  // je récupere la valeur false envoyer depuis le composant profil pour fermer la fenetre
  retourDeProfil(valueProfil: boolean) {
    console.log('La valeur retour', valueProfil);
    this.hideProfilModal = valueProfil;
  }

```

```
dans mon ts du composant modal
```

```bash

  // je creer une transmition de mon enfant vers son parent
@Output() valueModalProfil: EventEmitter<boolean> =
  new EventEmitter<boolean>();

// la methode qui va envoyer l'info false pour fermer la fenettre
transmettreValeurProfil() {
  console.log('profil', this.valueModalProfil.emit(false));

  // j'envoie ça
  this.valueModalProfil.emit(false);

## Etape 7 :

## Etape 8 : :

## Etape 9 : :

## Etape 10 : :

```

```

```
