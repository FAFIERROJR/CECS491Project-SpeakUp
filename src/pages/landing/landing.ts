/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Component } from '@angular/core';
import {FormsModule, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { User } from '../../app/models/user';
import { AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/userprovider/userprovider';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
    user: User;
    password: string;
    password2: string;
    showLogin: boolean;
    showSignUp: boolean;
    signup_form_control: FormGroup;
    login_form_control: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,
         public alertCtrl: AlertController, public userProvider: UserProvider)
    {
        this.afAuth.auth.onAuthStateChanged(user =>{
            if(user){
                console.log(user);
                this.navCtrl.setRoot(HomePage);
            }
        });
        
        this.user = new User;
        this.password = "";
        this.password2 = "";
        this.user.uni_email= "";
        this.showLogin = true;
        this.showSignUp = false;

        //test code
        // this.user = new User();
        // this.user.first_name = "Kyle";
        // this.user.last_name = "Pamintuan";
        // this.user.uni_email = "kp@gmail.com";
        // this.user.uni_id = "008830924";
        // this.password = "CECS491B";
        // this.password2 = "cecs4444";

        // this.verifyPassword()

        // this.login();
    }

    ngOnInit(){
        this.signup_form_control = new FormGroup({
            'first_name': new FormControl(this.user.first_name, [
                Validators.required,
                Validators.minLength(2)
            ]),

            'last_name': new FormControl(this.user.last_name, [
                Validators.required,
                Validators.minLength(2)
            ]),
            'passwords': new FormGroup({
                'password': new FormControl(this.password, [
                    Validators.required,
                    Validators.minLength(6)
                ]),
                'password2': new FormControl(this.password2, [
                    Validators.required,
                    Validators.minLength(6)
                ]),
                'passwords_match_validator': new FormControl([
                    this.passwords_match_validator()
                ])
            }),
            'uni_id': new FormControl(this.user.uni_id, [
                Validators.required,
                Validators.maxLength(7),
                Validators.minLength(7),
                Validators.pattern('^[0-9]{9}$')
            ]),
            'uni_email': new FormControl(this.user.uni_email, [
                Validators.required,
                Validators.email
            ])
        });

        this.login_form_control = new FormGroup({

            'password': new FormControl(this.password, [
                Validators.required,
                Validators.minLength(6)

            ]),
            'uni_email': new FormControl(this.user.uni_email, [
                Validators.required,
                Validators.email
            ])
        });
    }

    signUp()
    {
        console.log('signup/signup()/email: ', this.user.uni_email);
        console.log('signup/signup()/passwords: ', this.password, this.password2);
        this.afAuth.auth.createUserWithEmailAndPassword(this.user.uni_email, this.password).then((success) =>
        {
            this.user.uid = this.afAuth.auth.currentUser.uid;
            this.user.username = this.user.first_name + " " + this.user.last_name;

            this.createProfile();

            //update the display with the firstname and lastname
            this.afAuth.auth.currentUser.updateProfile
            ({
                displayName: this.user.username,
                photoURL: ""
            }).then((success) =>
            {
                //do something
            }).catch(err => {
                console.log(err);
            });

            this.navCtrl.setRoot(HomePage);

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
            this.password2 = '';
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

                this.navCtrl.setRoot(HomePage);

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
        this.userProvider.addUser(this.user.uid, this.user);
    }

    passwords_match_validator(): ValidatorFn
    {
       return (control: AbstractControl): {[key: string]: any} => {
        const forbidden = (this.password == this.password2);
        return forbidden? {'password_match': {value: control.value}} : null;
      };
    
    }

    verifyPassword()
    {
        console.log("verifyPassword() called");
      if (this.password === this.password2){
        this.signUp()
      } else {
        let alert = this.alertCtrl.create({
          title: 'Verification Error',
          subTitle: 'Passwords do not match',
          buttons: ['Dismiss']
        });
        alert.present();
        this.password = "";
        this.password2 = "";
      }
    }

    setShowLogin(){
        this.showLogin = true;
        this.showSignUp = false;
    }

    setShowSignUp(){
        this.showSignUp = true;
        this.showLogin = false;
    }

    ionViewDidLoad()
    {
      console.log('ionViewDidLoad SignupPage');
    }
}
