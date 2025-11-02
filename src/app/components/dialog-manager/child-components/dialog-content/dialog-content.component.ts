import {AfterViewInit, Component, Input, Type, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss'
})
export class DialogContentComponent implements AfterViewInit{
  @Input() componentType!: Type<any>;
  @Input() componentData: any;

  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  ngAfterViewInit() {
    if (this.componentType) {
      const compRef = this.container.createComponent(this.componentType);
      if (this.componentData) {
        Object.assign(compRef.instance, this.componentData);
      }
    }
  }
}
