import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
  @Input() id!: number;

  ngOnInit(){
    console.log('app-user-form')
    console.log(this.id)
  }
}
