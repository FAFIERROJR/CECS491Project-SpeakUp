import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LandingPage } from '../landing/landing';

import { ChatroomcardsComponent } from '../../components/chatroomcards/chatroomcards';
import { Observable } from '@firebase/util';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChatroomslistPage } from '../chatroomslist/chatroomslist';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  //courses: Observable<{}[]>;
  courses: any;
  uid: string;
  chatroomlist: any

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public afdb: AngularFireDatabase) {
    this.uid = this.afAuth.auth.currentUser.uid;
    //this.courses = this.afdb.list('userProfile/' + this.uid + '/courses').valueChanges();
    this.chatroomlist = ChatroomslistPage
  }

  /**
   * signout
   */
  signOut(): void {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LandingPage);
  }

}
