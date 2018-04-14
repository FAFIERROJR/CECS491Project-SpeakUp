import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Course } from '../../app/models/course';
import { NavController, AlertController } from 'ionic-angular';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Chatroom } from '../../app/models/chatroom';
import { UserProvider } from '../../providers/userprovider/userprovider';
import { CourseProvider } from '../../providers/courseprovider/courseprovider';

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
  level_num : number = 1;
  course_raw: any;
  chatroom: Chatroom;
  accessCode: any;
  selection_made: Boolean = false;
  continue_color: string = 'grey';

  constructor(public afdb: AngularFireDatabase, public afAuth: AngularFireAuth, public navCtrl: NavController,
      public alertCtrl: AlertController, public userProvider: UserProvider, public courseProvider: CourseProvider) {
    console.log('Course Picker Constructor');
    this.options = this.courseProvider.getDepartments();
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

  continue(){
    if(!this.selection_made){
      return;
    }
    this.selection_made = false;
    this.continue_color = 'grey';
    console.log('choice: ', this.choice);
    let path_array = this.path.split('/');
    if(this.level_num == 4){
      this.course.course_id = this.choice;
      this.course_id = this.course.course_id;
      let new_course: Course = this.course_raw;
      console.log(new_course);
      this.userProvider.addUserCourse(this.uid, new_course);
      this.navCtrl.pop();
      return;
    }
    // this.path = this.path + '/' +  this.choice;
    // this.options = this.afdb.list(this.path).valueChanges();
    // path_array = this.path.split('/');
    this.level_num++;
    console.log('this.level_num', this.level_num);
    switch(this.level_num){
      case 1:
        this.options = this.courseProvider.getDepartments();
        break;
      case 2:
        this.course.department = this.choice;
        break;
      case 3:
        this.course.course_number = this.choice;
        break;
      case 4:
        this.course.section = this.choice;
        break;
    }
    this.updateLevel();
  }

  addDialog(){
    if(this.level_num < 4){
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
    if(this.level_num == 4){
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
    this.course.name = this.course.department + ' ' + this.course.course_number + ' ' + this.course.section + ' ' + this.course.term + ' ' + this.course.year;
    this.courseProvider.addCourse(this.course.department, this.course.course_number, this.course.section.toString(),
        this.course).then(course_id => {
          console.log('promise course id: ', course_id);
          this.course.course_id = course_id;
          this.generateAccessCode();
        })
    return true;
  }

  addSection(data){
    switch(this.level_num){
      case 1:
        this.courseProvider.addDepartment(data.new_option);
        break;
      case 2:
        this.courseProvider.addCourseNumber(this.course.department, data.new_option);
        break;
      case 3:
        this.courseProvider.addSection(this.course.department, this.course.course_number, data.new_option);
        break;

    }
  }

  createChatroom(){
    console.log("creating chatroom...", this.accessCode);
    this.chatroom.accessCode = this.accessCode;
    let chatroom_id = this.afdb.database.ref('chatroom').push(this.chatroom).key
    this.afdb.object('chatroom/' + chatroom_id).update({
      'chatroom_id': chatroom_id
    });
    this.courseProvider.updateCourse(this.course.department, this.course.course_number, this.course.section.toString(),
        this.course.course_id, {chatroom_id: chatroom_id});
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

  setCourse(course_raw){
    this.course_raw = course_raw;
  }

  setSelection(){
    this.selection_made = true;
    this.continue_color = '#488aff';
    console.log("selection made: ", this.selection_made)
  }

  goBack(){
    this.level_num--;
    this.updateLevel();
    this.continue_color = 'grey';
  }

  updateLevel(){
    switch(this.level_num){
      case 1:
        this.level = 'Department';
        this.options = this.courseProvider.getDepartments();
        break;
      case 2:
        this.level = 'Course Number';
        this.options = this.courseProvider.getCourseNumbers(this.course.department);
        break;
      case 3:
        this.level = 'Course Section';
        this.options = this.courseProvider.getSections(this.course.department, this.course.course_number);
        break;
      case 4:
        this.level = 'Course';
        this.options = this.courseProvider.getCourses(this.course.department, this.course.course_number, this.course.section.toString())
        break;
    }
  }

}
