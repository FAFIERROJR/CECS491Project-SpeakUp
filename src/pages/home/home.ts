import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LandingPage } from '../landing/landing';

import { ChatroomcardsComponent } from '../../components/chatroomcards/chatroomcards';
import { Observable } from '@firebase/util';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  courses: Observable<any[]>;
  uid: string;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public afdb: AngularFireDatabase) {
    this.uid = this.afAuth.auth.currentUser.uid;
    this.courses = this.afdb.list('userProfile/' + this.uid + '/courses').valueChanges();
  }

  /**
   * signout
   */
  signOut(): void {
    this.afAuth.auth.signOut();
    this.navCtrl.push(LandingPage);
  }

}
