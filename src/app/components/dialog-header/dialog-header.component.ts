import {Component, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

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
  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef)
  ngOnInit() {
    console.log(this.dynamicDialogConfig)
    console.log(this.dynamicDialogRef)
    this.dynamicDialogRef.onChildComponentLoaded.subscribe(res => {
      console.log(res)
    })
  }

}
