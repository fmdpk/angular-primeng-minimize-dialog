import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-viewer',
  standalone: true,
  imports: [],
  templateUrl: './report-viewer.component.html',
  styleUrl: './report-viewer.component.scss'
})
export class ReportViewerComponent implements OnInit{
  @Input() id!: number;

  ngOnInit(){
    console.log('app-report-viewer')
    console.log(this.id)
  }
}
