import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../../app/models/comment';
import { Input } from '@angular/core';
import { Chatroom } from '../../app/models/chatroom';
import { CommentProvider } from '../../providers/commentprovider/commentprovider';
import { Observable } from 'rxjs/Observable';




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
  @Input('chatroom_id') chatroom_id: string;
  @Input('comment_id') comment_id: string;
  text: string;
  commentRef: any;
  comment: Observable<any>;
  room: Chatroom;

  constructor(public commentProvider: CommentProvider) {
    //this.commentRef = this.afdb.object('chatroom'+ this.roomPath + '/comments')
    this.comment = commentProvider.getComment(this.chatroom_id, this.comment_id);
    console.log("comment obvs", this.comment);
  }

  ngOnInit(){
    //this.commentRef = this.afdb.object('chatroom'+ this.roomPath + '/comments')
    this.comment = this.commentProvider.getComment(this.chatroom_id, this.comment_id);
    console.log("comment obvs, comment_id, chatroom_id", this.comment, this.comment_id, this.chatroom_id);
  }

  // createComment(){
  //   this.commentRef.push({
  //     [this.comment.comment_id] : this.comment
    
  //   });
  // }
  //readComment(){
    // this.commentRef = this.afdb.database.ref('chatroom'+ this.roomPath + '/comments'+this.commentID)
    // this.commentRef.transaction( value => 
    //   {
    //   this.comment.content = value;
    //   return value;
    
    //   }
  //);

  //}
  updateComment(){

  }

  deleteComment(){
    // this.commentRef = this.afdb.database.ref('chatroom'+ this.roomPath + '/comments'+this.commentID)
    // this.commentRef.remove(this.commentID);
    this.commentProvider.deleteComment(this.chatroom_id, this.comment_id);


  }
}