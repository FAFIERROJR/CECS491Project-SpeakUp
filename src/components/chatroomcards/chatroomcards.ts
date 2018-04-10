import { Component, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Chatroom } from '../../app/models/chatroom';
import { ChatroomPage } from '../../pages/chatroom/chatroom';
import { UserProvider } from '../../providers/userprovider/userprovider';

/**
 * Generated class for the ChatroomcardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chatroomcards',
  templateUrl: 'chatroomcards.html'
})
export class ChatroomcardsComponent {

  uid: string;
  course: Observable<any>;
  @Input() course_id: string;
  userProfile: any;
  user: any;
  is_instructor: boolean = false;
  courses: any;
  chatroom: Chatroom;
  lastAccessCode_ref: any;
  chatroom_accessCode_ref: any;
  accessCode: any;
  chatroom_obj: any;
  course_raw: any;
  //courses: Observable<{}[]>;
  chatroomlist: Observable<any[]>;
  chatroom_id: string

  constructor(public afAuth: AngularFireAuth, public afdb: AngularFireDatabase, public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }


  ngOnInit(){
    this.uid = this.afAuth.auth.currentUser.uid;
    this.course = this.userProvider.getUserCourse(this.uid, this.course_id);
    console.log("course obs", this.course);
    this.course.subscribe(course => {
      console.log("course_id", this.course_id)
      console.log("course raw", course);
      this.course_raw = course;
      this.chatroom_id = this.course_raw.chatroom_id;
    });
    this.userProfile = this.userProvider.getUser(this.uid).subscribe(user =>
      this.user = user);
  }

  deleteOrRemove(){
    console.log(this.course_id);
    if(this.user.is_instructor != null){
      console.log("is instructor not null");
      this.is_instructor = this.user.is_instructor;
      console.log(this.is_instructor)
      if(this.is_instructor === true){
        this.deleteChatroom();
        this.deleteCourse();
      }
      this.removeCourse();
    }
  }

  deleteChatroom(){
    console.log("deleting chatroom...");
    this.afdb.object('chatroom/' + this.chatroom_id).remove();
  }

  deleteCourse(){
    console.log("deleting course...");
    this.afdb.object('course/' + this.course_raw.department + '/' +  this.course_raw.course_number + '/' + this.course_raw.section + '/' +  this.course_id).remove();
  }

  removeCourse(){
    console.log("removing course...");
    this.userProvider.deleteUserCourse(this.uid, this.course_id);
  }

  enterChatroomDialog(){
    this.is_instructor = this.user.is_instructor;
    if(this.is_instructor === false){
      console.log('is_instructor: ', this.is_instructor);
      this.alertCtrl.create({
        title: 'Enter access code',
        inputs: [{
          name: 'access_code',
          placeholder: "Access Code"
        }],
        buttons: ['Cancel',
        {
          text: 'Enter',
          handler: data => {
            return this.accessChatroom(data.access_code)
          }
        }]
      }).present();
    }else{
      console.log('chatroom id', this.chatroom_id);
      this.navCtrl.push(ChatroomPage, {chatroom_id: this.chatroom_id});
    }

  }

  accessChatroom(access_code)
  {   
      // this.chatroom_accessCode_ref = this.afdb.database.ref('chatroom/' + chatroom_id)
      // this.chatroom_accessCode_ref.object().map( chatroom => this.chatroom = chatroom);

      let num: any
      // this.chatroom_accessCode_ref.transaction(function (value)
      // { 
      //     console.log(value)
      //     num = value
      //     return value 
      // });
      this.afdb.object('chatroom/' + this.chatroom_id).valueChanges().subscribe(chatroom => {
        this.chatroom_obj = chatroom;
      })

      num = this.chatroom_obj.accessCode;

      if (access_code === num)
      {            
          console.log("Success")
          this.navCtrl.push(ChatroomPage, {chatroom_id: this.chatroom_id} );
      }
      else
      {
          let alert = this.alertCtrl.create
          (({
              title: 'Access Code Invalid',
              subTitle: 'error',
              buttons: ['Dismiss']
          }));
          alert.present();
          this.accessCode = '';
      }
  }
}
