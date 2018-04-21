import { Component, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import {CommentComponent} from '../comment/comment'
import { CommentProvider } from '../../providers/commentprovider/commentprovider';
/**
 * Generated class for the CommentslistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'commentslist',
  templateUrl: 'commentslist.html'
})
export class CommentslistComponent {
  //repushing

  comments: Observable<any[]>;
  @Input('chatroom_id')
    chatroom_id: string;


  constructor(public commentProvider: CommentProvider, public alertCtrl: AlertController) {
    console.log('Hello CommentslistComponent Component');
    this.comments = this.commentProvider.getComments(this.chatroom_id);
    console.log("chatroom_id", this.chatroom_id);
    console.log("comments obvs", this.comments);
  }

  ngOnInit(){
    this.comments = this.commentProvider.getComments(this.chatroom_id);
    console.log("chatroom_id", this.chatroom_id);
    console.log("comments obvs", this.comments);
  }

  trackByFn(index, comment){
    return comment.comment_id;
  }

}
