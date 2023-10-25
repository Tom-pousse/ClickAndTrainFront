import { Component } from '@angular/core';
import { SocketIoService } from './service/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'click-train-front';

  constructor(private socketService: SocketIoService) {
    this.socketService.socket.on('server-event', (data) => {
      console.log('Données reçues du serveur:', data);
    });

    this.socketService.socket.emit('client-event', {
      message: 'Hello from the client!',
    });
  }
}
