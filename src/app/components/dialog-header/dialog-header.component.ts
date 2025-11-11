import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AppDialog} from '../dialog-manager/dialog-manager.component';
import {CustomDialogManagerService} from '../../services/custom-dialog-manager.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  destroyRef: DestroyRef = inject(DestroyRef)
  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef)
  customDialogManager: CustomDialogManagerService = inject(CustomDialogManagerService)
  dialog: AppDialog = this.dynamicDialogConfig.data.dialog

  ngOnInit() {
    this.customDialogManager.dialogAction$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      if(res.dialog && res.action === 'enlarge'){
        let elem = document.getElementsByClassName(`${res.dialog.class.split(' ')[0]}`)
        elem[0].parentElement!.style.display = 'flex';
      }
    })
  }

  minimizeDialog(dialog: AppDialog){
    let elem = document.getElementsByClassName(`${dialog.class.split(' ')[0]}`)
    elem[0].parentElement!.style.display = 'none';
    this.dialog.dialogRef = this.dynamicDialogRef
    this.customDialogManager.dialogAction$.next({dialog: this.dialog, dialogRef: this.dynamicDialogRef,action: 'minimize'})
  }

  closeDialog(dialog: AppDialog){
    // this.dynamicDialogRef.close()
    this.customDialogManager.dialogClose$.next(this.dialog.id)
  }

}
