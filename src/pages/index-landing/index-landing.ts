import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { IndexlandingpagemodalComponent } from '../../components/indexlandingpagemodal/indexlandingpagemodal';

/**
 * Generated class for the IndexLandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index-landing',
  templateUrl: 'index-landing.html',
})
export class IndexLandingPage {

  description: any;
  image: any;
  video: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexLandingPage');
  }

  scroll(el) {
    el.scrollIntoView({ behavior: "smooth" });
  }

  goToLogIn() {
    this.navCtrl.setRoot(LandingPage);
  }

  goToSignUp() {
    this.navCtrl.setRoot(LandingPage);
  }

  openModal(param) {
    switch (param) {
      case 'InstantFeedback':
        this.image ='';
        this.video = 'assets/videos/InstantFeedback.mov';
        this.description = "Instant feedback. ";
        break;
      case 'Anonymity':
        this.image = '';
        this.video = 'assets/videos/Anonymity.mov';
        this.description = "Anonymity";
        break;
      case 'InstructorModerated':
        this.image = 'assets/imgs/InstructorMenus.png';
        this.video = '';
        this.description = "Instructor's Menus";
        break;
      case 'ChildSafe':
        this.image = 'assets/imgs/ProfanityToast.png';
        this.video = '';
        this.description = "Profanity Check";
        break;
      case 'AntiSpam':
        this.image = '';
        this.video = 'assets/videos/AntiSpam.mov';
        this.description = "Anti-Spam";
        break;
      case 'CrossPlatform':
        this.image = 'assets/imgs/CrossPlatform.jpg';
        this.video = '';
        this.description = "Speak Up works on all major platforms";
        break;
    }

    this.modalCtrl.create(IndexlandingpagemodalComponent, {
      video: this.video,
      image: this.image,
      description: this.description
    }).present()
  }
}
