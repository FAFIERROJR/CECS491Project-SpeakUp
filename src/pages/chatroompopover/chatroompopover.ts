import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ChatroomsettingsComponent } from '../../components/chatroomsettings/chatroomsettings';

/**
 * Generated class for the ChatroompopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroompopover',
  templateUrl: 'chatroompopover.html',
})
export class ChatroompopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroompopoverPage');
  }

  chatroomSettings(){
    this.modalCtrl.create(ChatroomsettingsComponent).present();
}

  close() {
    this.viewCtrl.dismiss();
  }

}
