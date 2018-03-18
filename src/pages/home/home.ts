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
<<<<<<< HEAD


        this.generateAccessCode()

        //this.accessCode = "123466";
        this.accessChatroom();
=======
        // this.generateAccessCode();

        // this.chatroom = new Chatroom;
        // this.chatroom.accessCode = "123456";
        // this.createChatroom();
        
        // this.accessChatroom();
>>>>>>> ad5a91ed270fa048f26b5f5dd3ddcd1e5c63ece8
    }

    generateAccessCode()
    {
        this.lastAccessCode_ref = this.afdb.database.ref('lastAccessCode/value');

        this.lastAccessCode_ref.transaction(function(value) {
            console.log("Value:" ,value)
            this.accessCode = value
            return value = value+1

<<<<<<< HEAD
        });
  
  
=======
    createChatroom()
    {
        let chatroomDB_Ref = this.afdb.object('chatroom');

        chatroomDB_Ref.update
            ({
                [this.chatroom.accessCode]: this.chatroom
            })
>>>>>>> ad5a91ed270fa048f26b5f5dd3ddcd1e5c63ece8
    }


    accessChatroom()
<<<<<<< HEAD
    {   
        let num: any
        this.lastAccessCode_ref.transaction(function(value) { 
            console.log(value)
            num = value
            return value 
        });

        if (this.accessCode == num)
        {
            //this.navCtrl.setRoot(ChatroomPage);
            console.log("Success")
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

=======
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

>>>>>>> ad5a91ed270fa048f26b5f5dd3ddcd1e5c63ece8
    signOut(): void
    {
       this.afAuth.auth.signOut();
       this.navCtrl.push(LandingPage);
    }
}
