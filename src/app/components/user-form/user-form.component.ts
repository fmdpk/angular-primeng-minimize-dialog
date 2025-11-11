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
  dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig)
  customDialogManager: CustomDialogManagerService = inject(CustomDialogManagerService)

  ngOnInit(){
    console.log('app-user-form')
    this.customDialogManager.dialogClose$.subscribe(res => {
      if(res == this.dynamicDialogConfig.data.dialog.id){
        this.closeDialog()
      }
    })
    console.log(this.id)
  }

  closeDialog(){
    console.log(this.dynamicDialogConfig)
    this.customDialogManager.dialogClose$.next(0)
    this.dynamicDialogRef.close({dialogId: this.dynamicDialogConfig.data?.dialog.id})
  }
}
