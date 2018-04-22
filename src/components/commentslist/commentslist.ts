import { Component, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, InfiniteScroll } from 'ionic-angular';
import { CommentComponent } from '../comment/comment'
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
  comments: Observable<any[]>;
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

  items: any;


  constructor(public commentProvider: CommentProvider, public alertCtrl: AlertController) {
    console.log('Hello CommentslistComponent Component');
    this.comments_obvs = this.commentProvider.getComments(this.chatroom_id);
    console.log("chatroom_id", this.chatroom_id);
    console.log("comments obvs", this.comments_obvs);


    // this.items = [];

    // for (let i = 0; i < 2000; i++) {
    //   let item = {
    //     title: 'Title',
    //     body: 'body',
    //     number: i,
    //     avatarUrl: 'https://avatars.io/facebook/random' + i
    //   };

    //   this.items.push(item);
    // }

  }

  ngOnInit() {
    this.comments = this.commentProvider.getComments(this.chatroom_id);
    // console.log("chatroom_id", this.chatroom_id);
    // console.log("comments obvs", this.comments);
    this.comments_obvs = this.commentProvider.getComments(this.chatroom_id);
    this.comments_sub = this.comments_obvs.subscribe(comments => {
      this.full_comments = comments;
    });
  }

  trackByFn(index, item) {
    return item.comment_id;
  }

}
