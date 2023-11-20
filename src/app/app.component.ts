import { Component, HostListener } from '@angular/core';
import { SocketIoService } from './service/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'click-train-front';
}
