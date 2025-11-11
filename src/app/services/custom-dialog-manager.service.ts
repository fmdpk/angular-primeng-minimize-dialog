import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AppDialog} from '../components/dialog-manager/dialog-manager.component';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

export interface DialogAction {
  dialog?: AppDialog,
  dialogRef?: DynamicDialogRef,
  action?: "" | 'close' | 'minimize' | 'enlarge',
}

@Injectable({
  providedIn: 'root'
})
export class CustomDialogManagerService {
  dialogAction$: BehaviorSubject<DialogAction> = new BehaviorSubject<DialogAction>({})

  constructor() { }
}
