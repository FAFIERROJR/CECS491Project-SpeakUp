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

  constructor(public afAuth: AngularFireAuth, public afdb: AngularFireDatabase) {
  }


  ngOnInit(){
    this.uid = this.afAuth.auth.currentUser.uid;
    this.course = this.afdb.object("userProfile/" + this.uid + "/courses/" + this.course_id).valueChanges();
    console.log(this.course);
  }

}
