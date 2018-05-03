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
import { AnonymousNameProvider } from '../../providers/anonymousnameprovider/anonymousnameprovider';
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
  disableScrollDown: boolean;
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
  is_instructor: Boolean = false;
  user_sub: Subscription;
  users_sub: Subscription
  users_arr = {}
  names_sub: Subscription;
  name_bindings_obvs: Observable<any>
  names_arr: {}
  users_obvs: Observable<any[]>


  constructor(public commentProvider: CommentProvider, public alertCtrl: AlertController, public userProvider: UserProvider,
    public afAuth: AngularFireAuth, public anonNamesProvider: AnonymousNameProvider) {
    console.log('Hello CommentslistComponent Component');
    this.comments_obvs = new Observable<any[]>();

  }

  deleteComment(comment_id) {
    // this.commentRef = this.afdb.database.ref('chatroom'+ this.roomPath + '/comments'+this.commentID)
    // this.commentRef.remove(this.commentID);
    if (this.is_instructor) {
      this.commentProvider.deleteComment(this.chatroom_id, comment_id);
      console.log("deleting comment...");
    }
  }

  ngOnInit() {
    this.users_obvs = this.userProvider.getUsersObj();
    this.users_sub = this.users_obvs.subscribe(users => {
      this.users_arr = users
      console.log("users", this.users_arr);
    })
    this.uid = this.afAuth.auth.currentUser.uid;

    this.user_sub = this.userProvider.getUser(this.uid).subscribe(user => {
      this.is_instructor = user.is_instructor;
      console.log("is_instructor", this.is_instructor);

      this.name_bindings_obvs = this.anonNamesProvider.getNamesObj(this.chatroom_id, this.uid, this.is_instructor);
      console.log("name_bindgs obvs", this.name_bindings_obvs);
      this.names_sub = this.name_bindings_obvs.subscribe(names => {
        this.names_arr = names;
      })
    })
    this.comments = this.commentProvider.getComments(this.chatroom_id);
    // console.log("chatroom_id", this.chatroom_id);
    // console.log("comments obvs", this.comments);
    this.comments_obvs = this.commentProvider.getComments(this.chatroom_id);
    this.comments_sub = this.comments_obvs.subscribe(comments => {
      this.full_comments = comments;
      console.log(this.full_comments);
    });

  }
  onScroll() {
    let atBottom = this.content.scrollHeight - this.content.scrollTop === this.content.contentHeight
    if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false;
    } else {
      this.disableScrollDown = true;
    }
  }

  scrollToBottom() {
    if (this.disableScrollDown) {
      return
    }
    else {
      this.content.scrollToBottom();
    }
  }

  trackByFn(index, item) {
    return item.comment_id;
  }

  toggleTimestamp(i) {
    this.visible[i] = !this.visible[i];
  }

  getName(uid) {
    // console.log("comment.uid: ", uid)
    if (this.users_arr != null && this.users_arr[uid] != null) {
      if (this.users_arr[uid].is_instructor || uid == this.uid) {
        return this.users_arr[uid].username;
      }
    }
    if (this.names_arr != null && this.names_arr[uid] != null) {
      return 'Anynomous ' + this.names_arr[uid].name + this.names_arr[uid].suffix;
    }
    return 'Anynomous Liger'
  }

  getUrl(uid) {
    // console.log("comment.uid: ", uid)
    // if(this.users_arr != null && this.users_arr[uid] != null){
    //   if(this.users_arr[uid].is_instructor){
    //     return 'Liger'
    //   }
    //   return 'Liger'
    // }
    if (this.names_arr != null && this.names_arr[uid] != null) {
      return this.names_arr[uid].name;
    }
    return 'Liger';
  }

  getTimestamp(UTC_time){
    if(UTC_time != null){
      // let offset = new Date().getTimezoneOffset();
      // let offset_factor = 60000;
      let timestamp = new Date(UTC_time);

      return timestamp.toLocaleString('en-US');
    }
    return 'Sent at Unknown Time'
  }

}
