import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { LandingPage } from '../landing/landing';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage
{
    // chatroom_db_ref: any;
    lastAccessCode_ref: any;
    accessCode: any;
    
    
    constructor(public navCtrl: NavController, public afdb: AngularFireDatabase,
        public afAuth: AngularFireAuth, public alertCtrl: AlertController)
    {


        this.generateAccessCode();

        //this.accessCode = "123466";
        this.accessChatroom();
    }

    generateAccessCode()
    {
        this.lastAccessCode_ref = this.afdb.database.ref('lastAccessCode/value');

        this.lastAccessCode_ref.transaction(function(value) {
            console.log("Value:" ,value)
            this.accessCode = value
            return value = value

        });
  
  
    }


    accessChatroom()
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

    signOut(): void
    {
       this.afAuth.auth.signOut();
       this.navCtrl.push(LandingPage);
    }
}
