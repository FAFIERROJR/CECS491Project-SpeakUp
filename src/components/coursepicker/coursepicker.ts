import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Course } from '../../app/models/course';
import { NavController, AlertController } from 'ionic-angular';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Chatroom } from '../../app/models/chatroom';
import { UserProvider } from '../../providers/userprovider/userprovider';

/**
 * Generated class for the CoursepickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'coursepicker',
  templateUrl: 'coursepicker.html'
})
export class CoursepickerComponent {

  choice: any;
  options: Observable<any[]>;
  course_id: any = null;
  uid: any;
  user_obj: any;
  path: string = 'course'
  is_instructor: boolean = false;
  course: Course;
  level: string = 'Department';
  courses_raw: any;
  chatroom: Chatroom;
  accessCode: any;

  constructor(public afdb: AngularFireDatabase, public afAuth: AngularFireAuth, public navCtrl: NavController,
      public alertCtrl: AlertController, public userProvider: UserProvider) {
    console.log('Course Picker Constructor');
    this.options = this.afdb.list(this.path).valueChanges();
    this.uid = this.afAuth.auth.currentUser.uid;
    console.log('uid: ', this.uid);
    this.userProvider.getUser(this.uid).subscribe(user =>{
      this.user_obj= user;
      console.log('user_obj', this.user_obj);
      if(this.user_obj != null){
        console.log('is_instructor: ', this.is_instructor);
        this.is_instructor = this.user_obj.is_instructor;
      }
    })
    this.chatroom = new Chatroom;
    this.course = new Course;
  }

  select(){
    console.log('choice: ', this.choice);
    let path_array = this.path.split('/');
    if(path_array.length == 4){
      this.course.course_id = this.choice;
      this.course_id = this.course.course_id;
      console.log('path : ', this.path + '/' +  this.course.course_id)
  
      
      console.log("made it this far", this.courses_raw);
      
      this.afdb.object('userProfile/' + this.uid + '/courses/').update({
        [this.course.course_id]: this.courses_raw[this.course.course_id]
      });
      this.generateAccessCode();
      this.navCtrl.pop();
      return;
    }
    this.path = this.path + '/' +  this.choice;
    this.options = this.afdb.list(this.path).valueChanges();
    path_array = this.path.split('/');
    switch(path_array.length){
      case 1:
        this.level = 'Department';
        break;
      case 2:
        this.level = 'Course Number';
        this.course.department = this.choice;
        break;
      case 3:
        this.level = 'Course Section';
        this.course.course_number = this.choice;
        break;
      case 4:
        this.level = 'Course';
        this.course.section = this.choice;
        this.afdb.object(this.path).valueChanges().subscribe(courses =>{
          this.courses_raw = courses;
          console.log('course', courses);
          console.log('raw', this.courses_raw)
        });
        break;
    }
  }

  addDialog(){
    let path_array = this.path.split('/');
    if(path_array.length < 4){
      this.alertCtrl.create({
        title: 'Enter new ' + this.level,
        inputs: [{
          name: 'new_option',
          placeholder: this.level
        }],
        buttons: ['cancel', {
          text: 'Add',
          handler: data =>{
            return this.addSection(data);
          }
        }]
      }).present();
    }
    if(path_array.length == 4){
      this.alertCtrl.create({
        title: 'Enter new ' + this.level,
        inputs: [{
          name: 'term',
          placeholder: 'Term'
        },{
          name: 'year',
          placeholder: 'Year'
        }],
        buttons: ['cancel', {
          text: 'Add',
          handler: data =>{
            return this.addCourse(data);
          }
        }]
      }).present();
    }
  }

  addCourse(data){
    this.course.instructor_name = this.user_obj.username;
    this.course.instructor_id = this.uid;
    this.course.year = data.year;
    this.course.term = data.term;
    this.course.course_id = this.course.department + this.course.course_number + this.course.section + this.course.instructor_name + this.course.term + this.course.year;
    this.course.name = this.course.department + ' ' + this.course.course_number + ' ' + this.course.section + ' ' + this.course.term + ' ' + this.course.year;
    this.afdb.object(this.path).update({
      [this.course.course_id]: this.course
    });
    return true;
  }

  addSection(data){
    this.afdb.object(this.path).update({
      [data.new_option]: {
        key: data.new_option
      }
    });
    return true;
  }

  createChatroom(){
    console.log("creating chatroom...", this.accessCode);
    this.chatroom.accessCode = this.accessCode;
    let chatroom_id = this.afdb.database.ref('chatroom').push(this.chatroom).key
    this.afdb.object('chatroom/' + chatroom_id).update({
      'chatroom_id': chatroom_id
    });
    this.afdb.object(this.path +'/' + this.course_id ).update({
      chatroom_id: chatroom_id
    });
    this.userProvider.updateUserCourse(this.uid, this.course_id, {
      chatroom_id : chatroom_id
    });
  }

  generateAccessCode()
  {
      let lastAccessCode_ref = this.afdb.database.ref('lastAccessCode/value');

      lastAccessCode_ref.transaction(value =>
      {
          console.log("Value: ", value)
          this.accessCode = value
          return value = (value + 1) %1000000

      }).then(success => {
          console.log('accessCode: ', this.accessCode)
          this.createChatroom();
      })
  }

}
