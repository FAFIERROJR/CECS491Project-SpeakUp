import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../../app/models/comment';

/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})

export class ChatroomPage {

  commentDBRef: any;
  comm: Comment;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public afdb: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
  }


  createComment(){
    let commentDBRef = this.afdb.object('chatroom/commentID/comment');

    commentDBRef.update
    ({
        [this.comm.comment_id]: this.comm
    })

  }

}
