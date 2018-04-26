import { Component, Injectable, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, InfiniteScroll, Content } from 'ionic-angular';
import { CommentComponent } from '../comment/comment'
import { CommentProvider } from '../../providers/commentprovider/commentprovider';
import { Subscription } from 'rxjs/Subscription';
import { NO_COMPLETE_CHILD_SOURCE } from '@firebase/database/dist/esm/src/core/view/CompleteChildSource';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../../providers/userprovider/userprovider';
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
  visible: Array<boolean> = [];
  comments: Observable<any[]>;
  right_end: number;
  left_end: number;
  @ViewChild(Content) content: Content;
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
  timestampDisplay = false;
  uid: string;
  is_instructor: Boolean =false;
  user_sub: Subscription;



  constructor(public commentProvider: CommentProvider, public alertCtrl: AlertController, public userProvider: UserProvider, public afAuth: AngularFireAuth) {
    console.log('Hello CommentslistComponent Component');
    this.comments_obvs  = new Observable<any[]>();
    this.uid = this.afAuth.auth.currentUser.uid;
    this.user_sub = this.userProvider.getUser(this.uid).subscribe(user => {
      this.is_instructor = user.is_instructor;
      console.log("is_instructor", this.is_instructor);
  })
  
  }

  deleteComment(comment_id){
    // this.commentRef = this.afdb.database.ref('chatroom'+ this.roomPath + '/comments'+this.commentID)
    // this.commentRef.remove(this.commentID);
    if (this.is_instructor){
      this.commentProvider.deleteComment(this.chatroom_id, comment_id);
      console.log("deleting comment...");
    }
  }

  ngOnInit() {
    this.comments = this.commentProvider.getComments(this.chatroom_id);
    // console.log("chatroom_id", this.chatroom_id);
    // console.log("comments obvs", this.comments);
    this.comments_obvs = this.commentProvider.getComments(this.chatroom_id);
    this.comments_sub = this.comments_obvs.subscribe(comments => {
      this.full_comments = comments;
      console.log(this.full_comments);
    });
  }

  scrollToBottom(){
    this.content.scrollToBottom();
  }

  trackByFn(index, item) {
    return item.comment_id;
  }

  toggleTimestamp(i){
    this.visible[i] = !this.visible[i];
  }

}
