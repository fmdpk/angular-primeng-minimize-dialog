import {Component, DestroyRef, inject, OnInit, Type} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {PopoverModule} from 'primeng/popover';
import {NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {DialogContentComponent} from './child-components/dialog-content/dialog-content.component';
import {UserFormComponent} from '../user-form/user-form.component';
import {ReportViewerComponent} from '../report-viewer/report-viewer.component';
import {CustomDialogManagerService, DialogAction} from '../../services/custom-dialog-manager.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

export interface AppDialog {
  id: number;
  title: string;
  content: string;
  visible: boolean;
  minimized: boolean;
  data?: any,
  component: any
  class: string
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
})
export class DialogManagerComponent implements OnInit {
  dialogs: AppDialog[] = [];
  minimizedDialogs: AppDialog[] = [];
  dialogCounter = 0;
  customDialogManagerService: CustomDialogManagerService = inject(CustomDialogManagerService)
  destroyRef: DestroyRef = inject(DestroyRef)

  ngOnInit() {
    this.customDialogManagerService.dialogAction$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: DialogAction) => {
      if (res.dialogId) {
        if (res.action === 'close') {
          this.closeDialog({id: res.dialogId})
        }
        this.customDialogManagerService.dialogAction$.next({dialogId: 0, action: ''})
      }
    })
  }

  openNewDialog() {
    let newDialog: AppDialog = {
      id: ++this.dialogCounter,
      title: `Dialog #${this.dialogCounter}`,
      content: `This is the content of dialog #${this.dialogCounter}`,
      visible: true,
      class: `Dialog-${this.dialogCounter} minimizable-dialogs`,
      minimized: false,
      data: {
        id: this.dialogCounter
      },
      component: this.dialogCounter % 2 === 0 ? UserFormComponent : ReportViewerComponent
    };
    this.dialogs.push(newDialog);
  }

  toggleMinimize(dialog: AppDialog) {
    dialog.minimized = !dialog.minimized;
    // dialog.visible = !dialog.minimized;
    console.log(dialog)
    let elem = document.getElementsByClassName(`${dialog.class.split(' ')[0]}`)
    console.log(elem)
    if (elem[0].parentElement && dialog.minimized) {
      elem[0].parentElement.style.display = 'none';
    } else if (elem[0].parentElement && !dialog.minimized) {
      elem[0].parentElement.style.display = 'flex';
    }

    if (dialog.minimized) {
      this.minimizedDialogs.push(dialog);
    } else {
      this.filterDialog(dialog.id)
    }
  }

  filterDialog(dialogId: number) {
    this.minimizedDialogs = this.minimizedDialogs.filter(d => d.id !== dialogId);
  }

  closeDialog(dialog: Partial<AppDialog>) {
    this.dialogs = this.dialogs.filter(d => d.id !== dialog.id);
    this.minimizedDialogs = this.minimizedDialogs.filter(d => d.id !== dialog.id);
  }
}
