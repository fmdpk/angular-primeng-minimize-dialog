import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface DialogAction {
  dialogId: number;
  action: "" | 'close'
}

@Injectable({
  providedIn: 'root'
})
export class CustomDialogManagerService {
  dialogAction$: BehaviorSubject<DialogAction> = new BehaviorSubject<DialogAction>({dialogId: 0, action: ''})

  constructor() { }
}
