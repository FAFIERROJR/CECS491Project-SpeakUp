import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ChatroomsettingsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chatroomsettings',
  templateUrl: 'chatroomsettings.html'
})
export class ChatroomsettingsComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello ChatroomsettingsComponent Component');
    this.text = 'Hello World';
  }

  dismiss() {
    this.viewCtrl.dismiss();
}
}
