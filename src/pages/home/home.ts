import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { Chatroom } from '../../app/models/chatroom';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage
{
    chatroom: Chatroom;
    lastAccessCode_ref: any;
    chatroom_accessCode_ref: any;
    accessCode: any;

    constructor(public navCtrl: NavController, public afdb: AngularFireDatabase,
        public afAuth: AngularFireAuth, public alertCtrl: AlertController)
    {
        // this.generateAccessCode();

        // this.chatroom = new Chatroom;
        // this.chatroom.accessCode = "123456";
        // this.createChatroom();
        
        // this.accessChatroom();
    }

    generateAccessCode()
    {
        this.lastAccessCode_ref = this.afdb.object('lastAccessCode');
        this.lastAccessCode_ref.snapshotChanges().subscribe(action =>
        {
            // console.log(action.type);
            // console.log(action.key)
            console.log(action.payload.val())
        });

        console.log('Last Access Code: ', this.lastAccessCode_ref);
    }

    createChatroom()
    {
        let chatroomDB_Ref = this.afdb.object('chatroom');

        chatroomDB_Ref.update
            ({
                [this.chatroom.accessCode]: this.chatroom
            })
    }

    accessChatroom()
    {
        this.chatroom_accessCode_ref = this.afdb.object('chatroom/accessCode');
        if (this.accessCode === this.chatroom_accessCode_ref)
        {
            //this.navCtrl.setRoot(ChatroomPage);
        }
        else
        {
            let alert = this.alertCtrl.create
            (({
                title: 'Access Code Invalid',
                subTitle: 'error',
                buttons: ['Dismiss']
            }));
            alert.present();
            this.accessCode = '';
        }
    }

    signOut(): void
    {
       this.afAuth.auth.signOut();
       this.navCtrl.push(LandingPage);
    }
}
