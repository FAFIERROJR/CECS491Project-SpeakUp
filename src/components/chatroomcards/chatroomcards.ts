import { Component, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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

  constructor(public afAuth: AngularFireAuth, public afdb: AngularFireDatabase) {
  }


  ngOnInit(){
    this.uid = this.afAuth.auth.currentUser.uid;
    this.course = this.afdb.object("userProfile/" + this.uid + "/courses/" + this.course_id).valueChanges();
    this.userProfile = this.afdb.object('userProfile/' + this.uid).valueChanges().subscribe(user =>
      this.user = user);
  }

  deleteOrRemove(){
    console.log(this.course_id);
    if(this.user.is_instructor != null){
      console.log("is instructor not null");
      this.is_instructor = this.user.is_instructor;
      console.log(this.is_instructor)
      if(this.is_instructor === true){
        this.deleteCourse(this.course_id);
      }
      this.removeCourse(this.course_id);
    }
  }

  deleteCourse(course_id){
    console.log("deleting course...");
    this.afdb.object('course/' + course_id).remove();
  }

  removeCourse(course_id){
    console.log("removing course...");
    this.afdb.object('userProfile/' + this.uid + '/courses/' + course_id).remove();
  }
}
