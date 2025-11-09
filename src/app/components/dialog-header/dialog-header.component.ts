import {Component, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-header',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss'
})
export class DialogHeaderComponent implements OnInit{

  dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig)
  ngOnInit() {
    console.log(this.dynamicDialogConfig)
  }

}
