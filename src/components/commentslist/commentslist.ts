import { Component, Injectable, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, InfiniteScroll, Content, VirtualScroll } from 'ionic-angular';
import { CommentComponent } from '../comment/comment'
import { CommentProvider } from '../../providers/commentprovider/commentprovider';
import { Subscription } from 'rxjs/Subscription';
import { NO_COMPLETE_CHILD_SOURCE } from '@firebase/database/dist/esm/src/core/view/CompleteChildSource';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../../providers/userprovider/userprovider';
import { AnonymousNameProvider } from '../../providers/anonymousnameprovider/anonymousnameprovider';
import { VoteProvider } from '../../providers/voteprovider/voteprovider';
import { Vote } from '../../app/models/vote';
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
  disableScrollDown: boolean = false;
  visible: Array<boolean> = [];
  comments: Observable<any[]>;
  right_end: number;
  left_end: number;
  @ViewChild(Content) content: Content;
  @ViewChild('bottom') bottom_div : ElementRef;
  @ViewChild(VirtualScroll) virtual_scroll: VirtualScroll;
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
  can_add_scroll = true
  vote_history: any
  vote_sub: Subscription



  constructor(public commentProvider: CommentProvider, public alertCtrl: AlertController, public userProvider: UserProvider,
    public afAuth: AngularFireAuth, public anonNamesProvider: AnonymousNameProvider, public voteProvider: VoteProvider) {
    // this.bottom_div = document.getElementById('bottom');
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
      // console.log(this.full_comments);
      if(!this.disableScrollDown){
        this.scrollToBottom()
      }
    });
    this.content.ionScrollEnd.subscribe(() => {
      if(this.isElementInViewPort(this.bottom_div, window.innerHeight)){
        this.disableScrollDown = false;
      }
      else{
        this.disableScrollDown = true;
      }
    })

  }
  onScroll() {
    if(this.content != null){
      if(this.content.scrollTop != null){
        let atBottom = this.content.scrollHeight - this.content.scrollTop === this.content.contentHeight;
        if (this.disableScrollDown && atBottom) {
          this.disableScrollDown = false;
        } else {
          this.disableScrollDown = true;
        }
      }
    }
  }

  scrollToBottom(){
    // if (this.disableScrollDown) {
    //   return
    // }
    // else {
    //   let promise = new Promise((resolve, reject) => setTimeout(() => {
    //     while(this.content.isScrolling){
    //     }
    //       this.content.scrollToBottom();
    //       resolve();
    //   }, 300));
    // return promise;
    if(this.content.isScrolling && this.can_add_scroll){
      this.can_add_scroll = false;
     let sub = this.content.ionScrollEnd.subscribe(() =>{
        this.content.scrollToBottom();
        sub.unsubscribe();
        this.can_add_scroll = true;
      });
    }else if(!this.content.isScrolling){
      this.content.scrollToBottom();
    }

    //  }
  }

  // scrollToBottomHelper(): Promise<any> {
  //   let promise = new Promise((resolve, reject) => setTimeout(() => {
  //     resolve();
  //   }, 300));
  //   return promise;
  // }

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

  //This function just check if element is fully in vertical viewport or not
  isElementInViewPort(element: ElementRef,  viewPortHeight: number) {
    if(element != null){
      let rect = element.nativeElement.getBoundingClientRect(); 
      return rect.top >= 0  && (rect.bottom <= viewPortHeight);
    }
    console.log("elem is null");
    return false
  }
  
  vote(comment_id: string, value: number){
    console.log("voting...")
    let vote = new Vote;
    vote.uid = this.uid;
    vote.value = value;
    this.voteProvider.addVote(this.chatroom_id, comment_id, vote)
  }

}
