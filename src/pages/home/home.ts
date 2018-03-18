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
        this.generateAccessCode();

        this.chatroom = new Chatroom;
        this.chatroom.accessCode = "123456";
        this.createChatroom();
        
        this.accessChatroom();
    }

    generateAccessCode()
    {
        this.lastAccessCode_ref = this.afdb.database.ref('lastAccessCode/value');

        this.lastAccessCode_ref.transaction(function(value) {
            console.log("Value:" ,value)
            this.accessCode = value
            return value = value+1

        });
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
        this.chatroom_accessCode_ref = this.afdb.database.ref('chatroom/accessCode');

        let num: any
        this.chatroom_accessCode_ref.transaction(function(value) { 
            console.log(value)
            num = value
            return value 
        });

        if (this.accessCode === num)
        {            
            console.log("Success")
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
