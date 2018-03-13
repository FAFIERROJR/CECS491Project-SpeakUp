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

        //this.accessCode = "123456";
        //this.accessChatroom();
    }

    generateAccessCode()
    {

        // let accessCode: number
        // this.lastAccessCode_ref = this.afdb.object('lastAccessCode')

        // this.lastAccessCode_ref.valueChanges().subscribe(data =>
        //     {

        //          this.accessCode = data.value
        //          console.log(this.accessCode)
        //     });
        this.lastAccessCode_ref = this.afdb.database.ref('lastAccessCode/value');

        this.lastAccessCode_ref.transaction(function(value) {
            console.log(value)
            return value = value+1

        });

        
    }


    accessChatroom()
    {
        if (this.accessCode == this.lastAccessCode_ref)
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
