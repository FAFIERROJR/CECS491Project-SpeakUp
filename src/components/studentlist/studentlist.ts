import { Component, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ClasslistProvider } from '../../providers/classlistprovider/classlistprovider';

/**
 * Generated class for the StudentlistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'studentlist',
  templateUrl: 'studentlist.html'
})
export class StudentlistComponent {

  text: string;
  classlist_obvs: Observable<any[]>;
  @Input() chatroom_id: string;
  

  constructor(public viewCtrl: ViewController, public classlistProvider: ClasslistProvider) {
    console.log('Hello StudentlistComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){
    console.log("chatroom_id", this.chatroom_id);
    this.classlist_obvs = this.classlistProvider.getClasslist(this.chatroom_id)
    this.classlist_obvs.subscribe(studentlist =>{
      console.log("studentlist", studentlist);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  trackByFn(student){
    return student.uid;
  }

}
