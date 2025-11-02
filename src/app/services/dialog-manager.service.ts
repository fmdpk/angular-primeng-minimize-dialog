// dialog-manager.service.ts
import { Injectable, signal } from '@angular/core';
import {AppDialog} from '../models/dialog.model';

@Injectable({ providedIn: 'root' })
export class DialogManagerService {
  dialogs = signal<AppDialog[]>([]);

  open<T>(dialog: Omit<AppDialog<T>, 'id' | 'visible' | 'minimized'>) {
    this.dialogs.update(d => [
      ...d,
      { ...dialog, id: crypto.randomUUID(), visible: true, minimized: false }
    ]);
  }

  close(id: string) {
    this.dialogs.update(d => d.filter(dialog => dialog.id !== id));
  }

  minimize(id: string) {
    this.dialogs.update(d =>
      d.map(dialog => dialog.id === id ? { ...dialog, minimized: true, visible: false } : dialog)
    );
  }

  restore(id: string) {
    this.dialogs.update(d =>
      d.map(dialog => dialog.id === id ? { ...dialog, minimized: false, visible: true } : dialog)
    );
  }
}
