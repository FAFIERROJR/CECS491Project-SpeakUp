import { Component } from '@angular/core';
 
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { Input } from '@angular/core';

/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})

export class CommentComponent {

  text: string;
  commentDBRef: any;
  comment: any;

  @Input() comment_id: any;
  @Input() chatroom_id: any;

  constructor(public navCtrl: NavController, public afdb: AngularFireDatabase,
    public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.commentDBRef = this.afdb.object('chatroom/' + this.chatroom_id + 'comment/' + this.comment_id)

    console.log('Hello CommentComponent Component');
    this.text = 'Hello World';
  }

  createReply(){


  }

  deleteComment(){
    this.commentDBRef.remove()


  }

  updateComment(){


  }

  readComment(){
    this.comment = this.commentDBRef.valueChanges()


  }

}
