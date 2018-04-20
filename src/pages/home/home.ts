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

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage
{
    // chatroom: Chatroom;
    // lastAccessCode_ref: any;
    // chatroom_accessCode_ref: any;
    // accessCode: any;
    // //courses: Observable<{}[]>;
    // courses: any;
    uid: string;
    chatroomlist: any
    messages: any
    user_obvs: Observable<any>;
    is_instructor: boolean = false;
    username: string
    user_sub: Subscription;
    
    constructor(public navCtrl: NavController, public afdb: AngularFireDatabase,
        public afAuth: AngularFireAuth, public alertCtrl: AlertController, public userProvider: UserProvider)
    {
        // this.generateAccessCode();

        // this.chatroom = new Chatroom;
        // this.chatroom.accessCode = "123456";
        // this.createChatroom();
        
        // this.accessChatroom();

        this.uid = this.afAuth.auth.currentUser.uid;
        //this.courses = this.afdb.list('userProfile/' + this.uid + '/courses').valueChanges();
        //this.chatroomlist = ChatroomslistPage
        this.messages = MessagesPage;
        console.log(this.uid);
        this.user_obvs = this.userProvider.getUser(this.uid);
        this.user_sub = this.user_obvs.subscribe(user => {
            this.is_instructor = user.is_instructor;
            this.username = user.username;
            console.log(this.is_instructor);
        });

    }

    // generateAccessCode()
    // {
    //     this.lastAccessCode_ref = this.afdb.database.ref('lastAccessCode/value');

    //     this.lastAccessCode_ref.transaction(function (value)
    //     {
    //         console.log("Value: ", value)
    //         this.accessCode = value
    //         return value = value + 1

    //     });
    // }

    // createChatroom()
    // {
    //     let chatroomDB_Ref = this.afdb.object('chatroom');

    //     chatroomDB_Ref.update
    //     ({
    //         [this.chatroom.accessCode]: this.chatroom
    //     })
    // }

    // accessChatroom()
    // {   
    //     this.chatroom_accessCode_ref = this.afdb.database.ref('chatroom/accessCode');

    //     let num: any
    //     this.chatroom_accessCode_ref.transaction(function (value)
    //     { 
    //         console.log(value)
    //         num = value
    //         return value 
    //     });

    //     if (this.accessCode === num)
    //     {            
    //         console.log("Success")
    //         //this.navCtrl.setRoot(ChatroomPage);
    //     }
    //     else
    //     {
    //         let alert = this.alertCtrl.create
    //         (({
    //             title: 'Access Code Invalid',
    //             subTitle: 'error',
    //             buttons: ['Dismiss']
    //         }));
    //         alert.present();
    //         this.accessCode = '';
    //     }
    // }

    signOut(): void
    {
       this.afAuth.auth.signOut();
       this.navCtrl.setRoot(LandingPage);
    }
}
