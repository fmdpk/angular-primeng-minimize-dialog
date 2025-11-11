import {Component, DestroyRef, inject, OnInit, Type} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {PopoverModule} from 'primeng/popover';
import {NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {DialogContentComponent} from './child-components/dialog-content/dialog-content.component';
import {CustomDialogManagerService, DialogAction} from '../../services/custom-dialog-manager.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DialogHeaderComponent} from '../dialog-header/dialog-header.component';
import {Subscription} from 'rxjs';

export interface AppDialog {
  id: number;
  title: string;
  content: string;
  visible: boolean;
  minimized: boolean;
  dialogRef?: DynamicDialogRef
  data?: any,
  class: string
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
  dialogs: AppDialog[] = [];
  minimizedDialogs: AppDialog[] = [];
  dialogSubs: dialogSubscription[] = [];
  dialogCounter = 0;
  customDialogManagerService: CustomDialogManagerService = inject(CustomDialogManagerService)
  dialogService: DialogService = inject(DialogService)
  destroyRef: DestroyRef = inject(DestroyRef)
  ref: DynamicDialogRef | undefined;
  renderedComponents: any[] = []

  ngOnInit() {
    this.customDialogManagerService.dialogAction$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: DialogAction) => {
      if (res.dialog) {
        if (res.action === 'minimize') {
          this.minimizedDialogs.push(res.dialog)
        }
        this.customDialogManagerService.dialogAction$.next({})
      }
    })
  }

  async openNewDialog() {
    let component = this.dialogCounter % 2 === 0 ? () => import('../user-form/user-form.component').then(c => c.UserFormComponent) : () => import('../report-viewer/report-viewer.component').then(c => c.ReportViewerComponent)
    let newDialogData: AppDialog = {
      id: ++this.dialogCounter,
      title: `Dialog #${this.dialogCounter}`,
      content: `This is the content of dialog #${this.dialogCounter}`,
      visible: true,
      class: `Dialog-${this.dialogCounter} minimizable-dialogs`,
      minimized: false,
      data: {
        id: this.dialogCounter
      },
    };

    this.ref = this.dialogService.open(await component(), {
      header: 'Select a Product',
      duplicate: true,
      focusTrap: true,
      closeOnEscape: true,
      dismissableMask: false,
      maskStyleClass: 'custom-dialog-mask',
      autoZIndex: true,
      focusOnShow: true,
      appendTo: 'body',
      keepInViewport: false,
      styleClass: newDialogData.class,
      resizable: true,
      width: '50vw',
      modal:true,
      draggable: true,
      // breakpoints: {
      //   '960px': '75vw',
      //   '640px': '90vw'
      // },
      data: {
        dialog: newDialogData
      },
      templates: {
        header: DialogHeaderComponent
      }
    });
    const sub = this.ref.onClose.subscribe((res) => {
      console.log(res)
      this.clearDialogSubscription(res)
    });
    this.dialogSubs.push({
      id: this.dialogCounter,
      subscription: sub
    })
  }

  clearDialogSubscription(dialogId: number){
    this.dialogSubs = this.dialogSubs.filter(item => {
      if(item.id === dialogId){
        item.subscription.unsubscribe()
      }
      return item.id !== dialogId
    })
  }

  async getDialogComponent(component: any, name: string){
    let foundItem = this.renderedComponents.find((item) => item.name === name)
    console.log(foundItem)
    console.log(this.renderedComponents)
    if(!!foundItem){
      console.log(foundItem)
      console.log(foundItem.component)
      return foundItem.component
    } else {
      foundItem = await component()
      this.renderedComponents.push({
        name,
        component: foundItem
      })
      return foundItem
    }
  }

  enlargeDialog(dialog: AppDialog) {
    this.filterMinimizedDialogs(dialog.id)
    this.customDialogManagerService.dialogAction$.next({dialog: dialog, dialogRef: dialog.dialogRef,action: 'enlarge'})
  }

  filterMinimizedDialogs(dialogId: number) {
    this.minimizedDialogs = this.minimizedDialogs.filter(d => d.id !== dialogId);
  }

  closeDialog(dialog: Partial<AppDialog>) {
    this.minimizedDialogs = this.minimizedDialogs.filter(d => d.id !== dialog.id);
    dialog.dialogRef?.close()
  }
}
