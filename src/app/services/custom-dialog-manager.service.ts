import {DestroyRef, inject, Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {AppDialog, dialogSubscription} from '../components/dialog-manager/dialog-manager.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DialogHeaderComponent} from '../components/dialog-header/dialog-header.component';

export interface DialogAction {
  dialog?: AppDialog,
  dialogRef?: DynamicDialogRef,
  action?: "" | 'close' | 'minimize' | 'enlarge-in-component' | 'enlarge-in-service',
}

@Injectable({
  providedIn: 'root',
})
export class CustomDialogManagerService {
  dialogAction$: BehaviorSubject<DialogAction> = new BehaviorSubject<DialogAction>({})
  dialogClose$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  minimizedDialogs: AppDialog[] = [];
  dialogSubs: dialogSubscription[] = [];
  dialogCounter: number = 0;
  dialogService: DialogService = inject(DialogService)
  destroyRef: DestroyRef = inject(DestroyRef)
  ref: DynamicDialogRef | undefined;

  constructor() {
    this.dialogAction$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: DialogAction) => {
      if (res.dialog) {
        if (res.action === 'minimize') {
          this.addToMinimizedModals(res.dialog)
        } else if(res.action === 'close'){
          this.closeDialog(res.dialog)
        } else if(res.action === 'enlarge-in-service'){
          this.enlargeDialog(res.dialog)
        }
        this.dialogAction$.next({})
      }
    })
  }

  async openNewDialog(dialog: AppDialog) {
    this.dialogCounter = dialog.id
    this.ref = this.dialogService.open(await dialog.component(), {
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
      styleClass: dialog.class,
      resizable: true,
      width: '50vw',
      modal:true,
      draggable: true,
      // breakpoints: {
      //   '960px': '75vw',
      //   '640px': '90vw'
      // },
      data: {
        dialog: dialog
      },
      templates: {
        header: DialogHeaderComponent
      }
    });
    const sub: Subscription = this.ref.onClose.subscribe((res) => {
      console.log(res)
      dialog.onClose(res)
      this.clearDialogSubscription(res)
    });
    this.dialogSubs.push({
      id: this.dialogCounter,
      subscription: sub
    })
  }

  addToMinimizedModals(dialog: AppDialog){
    this.minimizedDialogs.push(dialog)
  }

  clearDialogSubscription(dialogId: number){
    this.dialogSubs = this.dialogSubs.filter(item => {
      if(item.id === dialogId){
        item.subscription.unsubscribe()
      }
      return item.id !== dialogId
    })
  }

  enlargeDialog(dialog: AppDialog) {
    this.filterMinimizedDialogs(dialog.id)
    this.dialogAction$.next({dialog: dialog, dialogRef: dialog.dialogRef,action: 'enlarge-in-component'})
  }

  filterMinimizedDialogs(dialogId: number) {
    this.minimizedDialogs = this.minimizedDialogs.filter(d => d.id !== dialogId);
  }

  closeDialog(dialog: Partial<AppDialog>) {
    this.filterMinimizedDialogs(dialog.id!)
    dialog.dialogRef?.close()
  }
}
