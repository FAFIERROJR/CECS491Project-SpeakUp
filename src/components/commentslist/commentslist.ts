import { Component, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import {CommentComponent} from '../comment/comment'
import { CommentProvider } from '../../providers/commentprovider/commentprovider';
import { Subscription } from 'rxjs/Subscription';
import { NO_COMPLETE_CHILD_SOURCE } from '@firebase/database/dist/esm/src/core/view/CompleteChildSource';
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

  comments_to_display = []
  full_comments = [];
  comments_obvs: Observable<any[]>;
  comments_sub: Subscription;
  page = 0;
  page_size = 20;
  @Input('chatroom_id')
    chatroom_id: string;


  constructor(public commentProvider: CommentProvider, public alertCtrl: AlertController) {
    console.log('Hello CommentslistComponent Component');
    this.comments_obvs = this.commentProvider.getComments(this.chatroom_id);
    console.log("chatroom_id", this.chatroom_id);
    console.log("comments obvs", this.comments_obvs);
  }

  ngOnInit(){
    // this.comments = this.commentProvider.getComments(this.chatroom_id);
    // console.log("chatroom_id", this.chatroom_id);
    // console.log("comments obvs", this.comments);
    this.comments_obvs = this.commentProvider.getComments(this.chatroom_id);
    this.comments_sub = this.comments_obvs.subscribe(comments => {
      this.full_comments = comments;
      this.comments_to_display = this.full_comments.slice(this.full_comments.length -20 + 1, this.full_comments.length);
    });
  }

  trackByFn(index, comment){
    return comment.comment_id;
  }

  doInfinite(infiniteScroll){
    console.log("scrolling");
    this.page++;
    let left_end = this.full_comments.length - this.page_size * (this.page + 1) + 1;
    let right_end = this.full_comments.length - this.page_size * this.page;
    if(left_end < 0){
      left_end = 0;
    }
    let new_comments = this.full_comments.slice(left_end, right_end);
    for(let comment of new_comments){
      let to_append = []
      to_append.push(comment);

      this.comments_to_display = to_append.concat(this.comments_to_display);
    }
    console.log("comments displayed", this.comments_to_display)
    infiniteScroll.complete();

    if(left_end == 0){
      infiniteScroll.enable(false);
    }
  }

}
