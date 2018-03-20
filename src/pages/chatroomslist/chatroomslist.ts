import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LandingPage } from '../landing/landing';

import { ChatroomcardsComponent } from '../../components/chatroomcards/chatroomcards';
import { Observable } from '@firebase/util';
import { AngularFireDatabase } from 'angularfire2/database';

import {User}  from '../../app/models/user'
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Course } from '../../app/models/course';


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


  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,
    public afdb: AngularFireDatabase, public alertCtrl: AlertController) {
    this.uid = this.afAuth.auth.currentUser.uid;
    this.courses = this.afdb.list('userProfile/' + this.uid + '/courses').valueChanges();
    this.userProfile = this.afdb.object('userProfile/' + this.uid).valueChanges().subscribe(user =>
    this.user = user);
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
      new_course.name = data.course_name;
      new_course.instructor = data.instructor_name;
      new_course.section = data.section;
      new_course.term = data.term;
      new_course.year = data.year;
      this.afdb.object('course').update({
        [key] : new_course
      });

      this.addCourseToUser(key, new_course);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomslistPage');
  }

}
