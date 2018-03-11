import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LandingPage } from '../landing/landing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {

  }

  /**
   * signout
   */
  signOut(): void {
    this.afAuth.auth.signOut();
    this.navCtrl.push(LandingPage);
  }

}
