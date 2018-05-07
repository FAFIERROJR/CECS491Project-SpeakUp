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
  video: any;

  constructor(public navParams: NavParams) {
    this.video = navParams.get('video');
    this.description = navParams.get('description');
    this.image = navParams.get('image');
  }

}
