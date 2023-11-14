import { Component, HostListener } from '@angular/core';
import { SocketIoService } from './service/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // private minWidth: number = 650;
  // private minHeight: number = 500;
  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   if (
  //     window.innerWidth < this.minWidth ||
  //     window.innerHeight < this.minHeight
  //   ) {
  //     window.resizeTo(this.minWidth, this.minHeight);
  //   }
  // }
  title = 'click-train-front';

  constructor(private socketService: SocketIoService) {
    this.socketService.socket.on('server-event', (data) => {
      // console.log('Données reçues du serveur:', data);
      data;
    });

    this.socketService.socket.emit('client-event', {
      message: 'Hello from the client!',
    });
  }
}
