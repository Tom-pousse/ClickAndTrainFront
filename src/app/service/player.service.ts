import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Player } from '../component/models/player';
import { LogPlayer } from '../component/models/logUser';
import { ReponseConnexion } from '../component/models/reponseConnexion';
import { Acquire } from '../component/models/acquire';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseApiUrl = 'http://localhost:3000/api';
  // player!: PLayer

  constructor(
    private http: HttpClient,
    private socketIoService: SocketIoService
  ) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  inscriptionUtilisateur(data: Player): Observable<Player> {
    console.log(data);

    return this.http.post<Player>(`${this.baseApiUrl}/auth/register`, data);
  }

  connexionUtilisateur(data: LogPlayer): Observable<ReponseConnexion> {
    return this.http.post<ReponseConnexion>(
      `${this.baseApiUrl}/auth/login`,
      data
    );
  }

  // voir avec formateur pourquoi ici ça marche mais pas dans le service aquire ... pb initialisation cascade ? conflit requete ?
  updateLvlUpgrade(player: Acquire): Observable<Acquire> {
    const headers = this.setHeaders();
    // console.log('save', player.num_score);
    return this.http.patch<Acquire>(`http://localhost:3000/api/jeu`, player, {
      headers,
    });
  }

  // updatePlayer(player: Player): Observable<Player> {
  //   const headers = this.setHeaders();
  //   // console.log('save', player.num_score);
  //   return this.http.patch<Player>(`http://localhost:3000/api/jeu`, player, {
  //     headers,
  //   });
  // }

  updatePlayer(player: Player): Observable<Player> {
    // Mise à jour du joueur via HTTP
    const headers = this.setHeaders();
    return this.http.patch<Player>(`http://localhost:3000/api/jeu`, player, {
      headers,
    });
  }

  getProfil(): Observable<Player> {
    const headers = this.setHeaders();
    return this.http.get<Player>(`${this.baseApiUrl}/profil`, {
      headers,
    });
  }

  getStat(): Observable<Player[]> {
    const headers = this.setHeaders();
    return this.http.get<Player[]>(`${this.baseApiUrl}/accueil`, {
      headers,
    });
  }
}
