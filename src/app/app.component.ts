import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DialogManagerComponent} from './components/dialog-manager/dialog-manager.component';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DialogManagerComponent, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-v18-primeng-minimize-dialog';
}
