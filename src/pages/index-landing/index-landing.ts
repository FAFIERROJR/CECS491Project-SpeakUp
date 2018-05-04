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
        this.image = 'https://i.imgur.com/D8yW8lN.mp4';
        this.description = "Instant feedback description";
        break;
      case 'Anonymity':
        this.image = 'image Anonymity';
        this.description = "Instant feedback description";
        break;
      case 'InstructorModerated':
        this.image = 'image InstructorModerated';
        this.description = "Instant feedback description";
        break;
      case 'ChildSafe':
        this.image = 'image ChildSafe';
        this.description = "Instant feedback description";
        break;
      case 'AntiSpam':
        this.image = 'image AntiSpam';
        this.description = "Instant feedback description";
        break;
      case 'CrossPlatform':
        this.image = 'image CrossPlatform';
        this.description = "Instant feedback description";
        break;
    }

    this.modalCtrl.create(IndexlandingpagemodalComponent, {
      image: this.image,
      description: this.description
    }).present()
  }
}
