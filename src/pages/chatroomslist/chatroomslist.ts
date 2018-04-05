import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LandingPage } from '../landing/landing';

import { ChatroomcardsComponent } from '../../components/chatroomcards/chatroomcards';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import {User}  from '../../app/models/user'
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Course } from '../../app/models/course';
import { Chatroom } from '../../app/models/chatroom';


/**
 * Generated class for the ChatroomslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroomslist',
  templateUrl: 'chatroomslist.html',
})
export class ChatroomslistPage {
    
  //courses: Observable<{}[]>;
  courses: any;
  userProfile: any;
  uid: string;
  user: any;
  is_instructor: boolean = false;
  chatroom: Chatroom;
  lastAccessCode_ref: any;
  chatroom_accessCode_ref: any;
  accessCode: any;
  access_code_obj: any;
  //courses: Observable<{}[]>;
  chatroomlist: Observable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,
    public afdb: AngularFireDatabase, public alertCtrl: AlertController) {
    this.uid = this.afAuth.auth.currentUser.uid;
    this.courses = this.afdb.list('userProfile/' + this.uid + '/courses').valueChanges();
    this.userProfile = this.afdb.object('userProfile/' + this.uid).valueChanges().subscribe(user =>
    this.user = user);
    this.chatroom = new Chatroom;
    this.afdb.object('lastAccessCode').valueChanges().subscribe(data => {
      this.access_code_obj = data;
      console.log("acces code obj:", this.access_code_obj);
    });
  }

  addCourseDialog(){
    console.log(this.user.is_instructor);
    if(this.user.is_instructor != null){
      console.log("is instructor not null");
      this.is_instructor = this.user.is_instructor;
      console.log(this.is_instructor)
      if(this.is_instructor === true){
        console.log("is instructor");
        let create_course_alert = this.alertCtrl.create({
          title: 'Create Course',
          subTitle: '',
          inputs: [
            {
              name: 'instructor_name',
              placeholder: 'Instructor\'s Name'
            },
            {
              name: 'course_name',
              placeholder: 'Course Name'
            },
            {
              name:'section',
              placeholder: 'Section'
            },
            {
              name: 'term',
              placeholder: 'Term'
            },
            {
              name: 'year',
              placeholder: 'Year'
            }
          ],
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "Create",
              handler: data => {
                  return this.createCourse(create_course_alert, data);
              }
            }
          ]
        });
        create_course_alert.present();
      }
    }
  }

  addCourseToUser(key, new_course){
    this.afdb.object('userProfile/'+ this.uid + '/courses').update({
      [key] : new_course
    });
  }

  createCourse(alert, data){
    console.log(data.course_name, data.section, data.term, data.year, data.instructor_name);
    if(data.course_name && data.section && data.term && data.year  && data.instructor_name ){
      console.log("returning true");
      let key = "" + data.course_name + data.section + data.term + data.year;
      let new_course = new Course;
      new_course.course_id = key;
      new_course.course_id.trim();
      new_course.name = data.course_name;
      new_course.instructor_name = data.instructor_name;
      new_course.instructor_id = this.uid;
      new_course.section = data.section;
      new_course.term = data.term;
      new_course.year = data.year;
      this.afdb.object('course').update({
        [key] : new_course
      });
      new_course.chatroom_id = this.createChatroom();

      this.addCourseToUser(key, new_course);
      this.afdb.object('course/').update({
        [key]: new_course
      })
      return true;
    }else {
      console.log("returning false");
      alert.setSubTitle('Please fill in all fields');
      // this.alertCtrl.create({
      //   title:'Please fill in all fields',
      //   buttons: [
      //     {
      //       text:'Dismiss',
      //     }
      //   ]
      // }).present();
      return false;
    }
  }

  createChatroom(){
    this.generateAccessCode();
    this.chatroom.accessCode = this.accessCode;
    let chatroom_id = this.afdb.database.ref('chatroom').push(this.chatroom).key
    this.afdb.object('chatroom/' + chatroom_id).update({
      'chatroom_id': chatroom_id
    });
    return chatroom_id;
  }

  generateAccessCode()
  {
      this.lastAccessCode_ref = this.afdb.database.ref('lastAccessCode/value');
      this.accessCode = this.access_code_obj.value;

      this.lastAccessCode_ref.transaction(function (value)
      {
          console.log("Value: ", value)
          this.accessCode = value
          return value = (value + 1) %1000000

      });

      while(this.accessCode == null){
        console.log("accessCode: ", this.accessCode);
      }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomslistPage');
  }

}
