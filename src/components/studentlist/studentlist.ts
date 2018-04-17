import { Component } from '@angular/core';

/**
 * Generated class for the StudentlistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'studentlist',
  templateUrl: 'studentlist.html'
})
export class StudentlistComponent {

  text: string;

  constructor() {
    console.log('Hello StudentlistComponent Component');
    this.text = 'Hello World';
  }

}
