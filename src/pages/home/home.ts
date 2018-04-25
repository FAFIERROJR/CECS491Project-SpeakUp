import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { Chatroom } from '../../app/models/chatroom';
import { ChatroomcardsComponent } from '../../components/chatroomcards/chatroomcards';
import { Observable } from 'rxjs/Observable';
import { MessagesPage } from '../messages/messages';
import { UserProvider } from '../../providers/userprovider/userprovider';
import { Subscription } from 'rxjs/Subscription';
import { ChatroomslistComponent } from '../../components/chatroomslist/chatroomslist';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage
{
    uid: string;
    chatroomlist: any
    messages: any
    user_obvs: Observable<any>;
    is_instructor: boolean = false;
    username: string
    user_sub: Subscription;
    
    constructor(public navCtrl: NavController, public afdb: AngularFireDatabase,
        public afAuth: AngularFireAuth, public alertCtrl: AlertController, public userProvider: UserProvider, public navParams: NavParams)
    {
        this.uid = this.afAuth.auth.currentUser.uid;
        this.chatroomlist = ChatroomslistComponent
        this.messages = MessagesPage;
        console.log(this.uid);
        this.user_obvs = this.userProvider.getUser(this.uid);
        this.user_sub = this.user_obvs.subscribe(user => {
            this.is_instructor = user.is_instructor;
            this.username = user.username;
            console.log(this.is_instructor);
        });

    }

    signOut(): void
    {
       this.afAuth.auth.signOut();
       this.navCtrl.setRoot(LandingPage);
    }
}
