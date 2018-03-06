import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { User } from '../../app/models/user';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage
{
    user: User;
    password: string;
    password2: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,
        public afdb: AngularFireDatabase, public alertCtrl: AlertController)
    {
        /*
        this.user = new User();
        this.user.first_name = "Kyle";
        this.user.last_name = "Pamintuan";
        this.user.uni_email = "kp@gmail.com";
        this.user.uni_id = "008830924";
        this.password = "CECS491B";
        this.password2 = "cecs4444";

        // this.signUp()
        // this.verifyPassword()
        //this.login()
        */
    }

    signUp()
    {
        this.afAuth.auth.createUserWithEmailAndPassword(this.user.uni_email, this.password).then((success) =>
        {
            this.user.uid = this.afAuth.auth.currentUser.uid;
            this.user.username = this.user.first_name + " " + this.user.last_name;

            this.createProfile();

            // update the display with the firstname and lastname
            this.afAuth.auth.currentUser.updateProfile
            ({
                displayName: this.user.username,
                photoURL: ""
            }).then((success) =>
            {
                // do something
            });

        }).catch((err) =>
        {
            let alert = this.alertCtrl.create({
                title: 'Sign Up Failed',
                subTitle: err,
                buttons: ['Dismiss']
            });
            alert.present();
            this.user.uni_email = '';
            this.password = '';
        });
    }

    login()
    {
        this.afAuth.auth.signInWithEmailAndPassword(this.user.uni_email, this.password)
            .then((success) =>
            {          
                this.user.username = this.afAuth.auth.currentUser.displayName;
                this.user.uid = this.afAuth.auth.currentUser.uid;

                console.log('Login: ' + this.user.uid);
            }).catch((err) =>
            {
                let alert = this.alertCtrl.create(({
                    title: 'Login Failed',
                    subTitle: err,
                    buttons: ['Dismiss']
                }));
                alert.present();
                this.user.uni_email = '';
                this.password = '';
            }
            );
    }

    createProfile()
    {
        let userProfileDB_Ref = this.afdb.object('userProfile');

        userProfileDB_Ref.update
        ({
                [this.user.uid]: this.user
        })
    }

    verifyPassword()
    {
      if (this.password === this.password2){
        this.signUp()
      } else {
        let alert = this.alertCtrl.create({
          title: 'Verification Error',
          subTitle: 'Passwords do not match',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }

    ionViewDidLoad()
    {
      console.log('ionViewDidLoad SignupPage');
    }

}
