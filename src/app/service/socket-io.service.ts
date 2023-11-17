// socket-io.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Player } from '../component/models/player';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  public socket: Socket;
  private baseUrl = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.baseUrl);
    this.socket.on('connect', () => {
      // console.log('Connecté à Socket.IO...');
    });
    this.socket.on('connect_error', (error) => {
      console.error('Erreur de connexion à Socket.IO', error);
    });
  }

  // ...
  // j'envoie vers le serveur
  envoieDePlayerAuServer(data: Player) {
    this.socket.emit('clickZone', data);
    // console.log("je part d'ici");
  }

  // Méthode pour écouter l'événement du serveur
  ecouteDuJoueurDepuisServeur(): Observable<Player> {
    return new Observable((observer) => {
      this.socket.on('clickZone', (data) => {
        observer.next(data);
        // console.log('je reviens par la');
      });
    });
  }
}
