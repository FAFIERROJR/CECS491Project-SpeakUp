import { Component, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, InfiniteScroll } from 'ionic-angular';
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
  right_end: number;
  left_end: number;
  //repushing

  comments_to_display = []
  full_comments = [];
  comments_obvs: Observable<any[]>;
  comments_sub: Subscription;
  page = 0;
  page_size = 20;
  startUp = true;
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

      if(this.startUp){
        this.comments_to_display = this.full_comments.slice(this.full_comments.length -20 + 1, this.full_comments.length);
        this.startUp = false;
      }

      if(this.commentProvider.enterKeyPressed){
        console.log("Enter KEY PRESSED")
        this.comments_to_display = this.full_comments.slice(this.full_comments.length -20 + 1, this.full_comments.length);
        this.page = 0;
      }
    });
  }

  trackByFn(index, comment){
    return comment.comment_id;
  }

  doInfinite(infiniteScroll){
    console.log("scrolling");
    this.page++;
    this.left_end = this.full_comments.length - this.page_size * (this.page + 1) + 1;
    this.right_end = this.full_comments.length - this.page_size * this.page;
    if(this.left_end < 0){
      this.left_end = 0;
    }
    let new_comments = this.full_comments.slice(this.left_end, this.right_end);
    for(let i = new_comments.length - 1; i >= 0; i--){
      let to_append = []
      to_append.push(new_comments[i]);

      this.comments_to_display = to_append.concat(this.comments_to_display);
    }
    console.log("comments displayed", this.comments_to_display)
    infiniteScroll.complete();

    if(this.left_end === 0){
      infiniteScroll.enable(false);
    }
    if(this.page === 0) {
      infiniteScroll.enable(true);
    }
  }

}
