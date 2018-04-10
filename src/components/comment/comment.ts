import { Component } from '@angular/core';
<<<<<<< HEAD
 
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { Input } from '@angular/core';
=======
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../../app/models/comment';
import { Input } from '@angular/core';
import { Chatroom } from '../../app/models/chatroom';



>>>>>>> bd44e0ed2606a8efe6c148e262043fb4e87fe7ac

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
<<<<<<< HEAD

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
=======
export class CommentComponent {
  @Input() roomPath: string;
  @Input() commentID: any;
  text: string;
  commentRef: any;
  comment: Comment;
  room: Chatroom;

  constructor(public afdb: AngularFireDatabase) {
    this.commentRef = this.afdb.object('chatroom'+ this.roomPath + '/comments')
  }

  createComment(){

    this.commentRef.push({
      [this.comment.comment_id] : this.comment

    
    });
  }

  readComment(){
    this.commentRef = this.afdb.database.ref('chatroom'+ this.roomPath + '/comments'+this.commentID)

    this.commentRef.transaction( value => 
      {

      this.comment.content = value;
      return value;

    
      }
  );
>>>>>>> bd44e0ed2606a8efe6c148e262043fb4e87fe7ac


  }

  updateComment(){


  }

<<<<<<< HEAD
  readComment(){
    this.comment = this.commentDBRef.valueChanges()


  }

=======
  deleteComment(){
    this.commentRef = this.afdb.database.ref('chatroom'+ this.roomPath + '/comments'+this.commentID)
    this.commentRef.remove(this.commentID);


  }
>>>>>>> bd44e0ed2606a8efe6c148e262043fb4e87fe7ac
}
