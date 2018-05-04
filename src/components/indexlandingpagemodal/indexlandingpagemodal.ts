import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/**
 * Generated class for the IndexlandingpagemodalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'indexlandingpagemodal',
  templateUrl: 'indexlandingpagemodal.html'
})
export class IndexlandingpagemodalComponent { 

  text: string;
  description: any;
  image: any;

  constructor(public navParams: NavParams) {
    console.log('Hello IndexlandingpagemodalComponent Component');
    this.text = 'Hello World';
    this.description = navParams.get('description');
    this.image = navParams.get('image');
  }

}
