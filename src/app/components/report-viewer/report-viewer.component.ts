import {Component, Input, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';

@Component({
  selector: 'app-report-viewer',
  standalone: true,
  imports: [
    Button,
    FocusTrapModule
  ],
  templateUrl: './report-viewer.component.html',
  styleUrl: './report-viewer.component.scss'
})
export class ReportViewerComponent implements OnInit{
  @Input() id!: number;

  ngOnInit(){
    console.log('app-report-viewer')
    console.log(this.id)
  }
}
