import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../../app/models/comment';
import { Input } from '@angular/core';
import { Chatroom } from '../../app/models/chatroom';




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


  }

  updateComment(){


  }

  deleteComment(){
    this.commentRef = this.afdb.database.ref('chatroom'+ this.roomPath + '/comments'+this.commentID)
    this.commentRef.remove(this.commentID);


  }
}
