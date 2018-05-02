import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LandingPage } from '../landing/landing';

/**
 * Generated class for the IndexLandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index-landing',
  templateUrl: 'index-landing.html',
})
export class IndexLandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexLandingPage');
  }

  scroll(el) {
    el.scrollIntoView({ behavior: "smooth" });
  }

  goToLogIn(){
    this.navCtrl.setRoot(LandingPage);
  }

  goToSignUp(){
    this.navCtrl.setRoot(LandingPage);
  }
}
