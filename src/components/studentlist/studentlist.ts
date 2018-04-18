import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

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

  constructor(public viewCtrl: ViewController) {
    console.log('Hello StudentlistComponent Component');
    this.text = 'Hello World';
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
