import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DialogManagerComponent} from './dialog-manager/dialog-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DialogManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-v18-primeng-minimize-dialog';
}
