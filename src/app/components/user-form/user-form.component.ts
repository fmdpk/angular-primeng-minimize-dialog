import {Component, inject, Input, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {CustomDialogManagerService} from '../../services/custom-dialog-manager.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
  @Input() id!: number;
  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef)

  ngOnInit(){
    console.log('app-user-form')
    console.log(this.id)
  }

  closeDialog(){
    this.dynamicDialogRef.close()
  }
}
