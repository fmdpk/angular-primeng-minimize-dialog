import {Component, inject, Input, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import { FocusTrapModule } from 'primeng/focustrap';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {CustomDialogManagerService} from '../../services/custom-dialog-manager.service';

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

  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef)
  dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig)
  customDialogManager: CustomDialogManagerService = inject(CustomDialogManagerService)

  ngOnInit(){
    console.log('app-report-viewer')
    console.log(this.id)
    this.customDialogManager.dialogClose$.subscribe(res => {
      if(res && res == this.dynamicDialogConfig.data.dialog.id){
        this.closeDialog()
      }
    })
  }

  closeDialog(){
    console.log(this.dynamicDialogConfig)
    this.customDialogManager.dialogClose$.next(0)
    this.dynamicDialogRef.close({dialogId: this.dynamicDialogConfig.data?.dialog.id})
  }
}
