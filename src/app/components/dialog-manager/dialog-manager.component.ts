import {Component, Type} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {PopoverModule} from 'primeng/popover';
import {NgComponentOutlet, NgForOf, NgIf} from '@angular/common';
import {DialogContentComponent} from './child-components/dialog-content/dialog-content.component';
import {UserFormComponent} from '../user-form/user-form.component';
import {ReportViewerComponent} from '../report-viewer/report-viewer.component';

interface AppDialog {
  id: number;
  title: string;
  content: string;
  visible: boolean;
  minimized: boolean;
  data?: any,
  component: any
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
export class DialogManagerComponent {
  dialogs: AppDialog[] = [];
  minimizedDialogs: AppDialog[] = [];
  dialogCounter = 0;
  dockVisible = false;

  openNewDialog() {
    let newDialog: AppDialog = {
      id: ++this.dialogCounter,
      title: `Dialog #${this.dialogCounter}`,
      content: `This is the content of dialog #${this.dialogCounter}`,
      visible: true,
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
    dialog.visible = !dialog.minimized;

    if (dialog.minimized) {
      this.minimizedDialogs.push(dialog);
    } else {
      this.minimizedDialogs = this.minimizedDialogs.filter(d => d.id !== dialog.id);
    }
  }

  restoreDialog(dialog: AppDialog) {
    dialog.minimized = false;
    dialog.visible = true;
    this.minimizedDialogs = this.minimizedDialogs.filter(d => d.id !== dialog.id);
  }

  toggleDock() {
    this.dockVisible = !this.dockVisible;
  }

  closeDialog(dialog: AppDialog) {
    this.dialogs = this.dialogs.filter(d => d.id !== dialog.id);
    this.minimizedDialogs = this.minimizedDialogs.filter(d => d.id !== dialog.id);
  }
}
