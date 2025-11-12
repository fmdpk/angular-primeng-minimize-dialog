import {Component, inject, OnInit} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {PopoverModule} from 'primeng/popover';
import {NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {DialogContentComponent} from './child-components/dialog-content/dialog-content.component';
import {CustomDialogManagerService} from '../../services/custom-dialog-manager.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Subscription} from 'rxjs';

export interface AppDialog {
  id: number;
  title: string;
  content: string;
  visible: boolean;
  minimized: boolean;
  component?: any;
  dialogRef?: DynamicDialogRef;
  data?: any;
  onClose: (data: any) => void;
  class: string;
}

export interface dialogSubscription {
  id: number;
  subscription: Subscription
}

@Component({
  selector: 'app-dialog-manager',
  templateUrl: './dialog-manager.component.html',
  styleUrls: ['./dialog-manager.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    PrimeTemplate,
    ButtonModule,
    PopoverModule,
    NgForOf,
    NgIf,
    NgComponentOutlet,
    DialogContentComponent
  ],
  providers: [DialogService]
})
export class DialogManagerComponent implements OnInit {

  customDialogManagerService: CustomDialogManagerService = inject(CustomDialogManagerService)

  get dialogCounter() {
    return this.customDialogManagerService.dialogCounter
  }

  get minimizedDialogs() {
    return this.customDialogManagerService.minimizedDialogs
  }

  ngOnInit() {
  }

  async openNewDialog() {
    let component = this.dialogCounter % 2 === 0 ? () => import('../user-form/user-form.component').then(c => c.UserFormComponent) : () => import('../report-viewer/report-viewer.component').then(c => c.ReportViewerComponent)
    let newDialogData: AppDialog = {
      id: this.dialogCounter + 1,
      title: `Dialog #${this.dialogCounter}`,
      content: `This is the content of dialog #${this.dialogCounter}`,
      visible: true,
      class: `Dialog-${this.dialogCounter} minimizable-dialogs`,
      minimized: false,
      onClose: this.onDialogClose,
      component,
      data: {
        id: this.dialogCounter
      },
    };

    await this.customDialogManagerService.openNewDialog(newDialogData)
  }

  onDialogClose(data: any) {
    console.log(data)
  }

  enlargeDialog(dialog: AppDialog) {
    this.customDialogManagerService.enlargeDialog(dialog)
  }

  closeDialog(dialog: Partial<AppDialog>) {
    this.customDialogManagerService.closeDialog(dialog)
  }
}
