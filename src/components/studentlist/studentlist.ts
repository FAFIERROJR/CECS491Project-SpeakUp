import { Component, Input } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ClasslistProvider } from '../../providers/classlistprovider/classlistprovider';
import { AngularFireAuth } from 'angularfire2/auth';
import { AnonymousNameProvider } from '../../providers/anonymousnameprovider/anonymousnameprovider';
import { UserProvider } from '../../providers/userprovider/userprovider';
import { Subscription } from 'rxjs/Subscription';

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

  items: any[];
  classlist_sub: any;
  text: string;
  classlist_obvs: Observable<any[]>;
  @Input() chatroom_id: string;
  uid: string;
  is_instructor: Boolean =false;
  user_sub: Subscription;
  users_sub: Subscription
  users_arr = {}
  names_sub: Subscription;
  name_bindings_obvs: Observable<any>
  names_arr : {}
  users_obvs : Observable<any[]>

  constructor(public viewCtrl: ViewController, public classlistProvider: ClasslistProvider, public navParams: NavParams,
  public afAuth : AngularFireAuth, public anonNamesProvider: AnonymousNameProvider, public userProvider: UserProvider) {
    console.log('Hello StudentlistComponent Component');
    this.text = 'Hello World';  

    let chatroom_id = this.navParams.get('chatroom_id');
    if(chatroom_id != null || chatroom_id != ""){
      this.chatroom_id = chatroom_id
    }

    this.items = [];
    for(let i = 0; i < 100; i++){
   
      let item = {
        title: 'Title',
        body: 'body',
        number: i,
        avatarUrl: 'https://avatars.io/facebook/random'+i
      };
      this.items.push(item);
    }

  }

  ngOnInit(){
    this.uid = this.afAuth.auth.currentUser.uid;
    this.classlist_obvs = this.classlistProvider.getClasslist(this.chatroom_id)
    this.classlist_sub = this.classlist_obvs.subscribe(studentlist =>{
      console.log("studentlist", studentlist);
    });
    this.user_sub = this.userProvider.getUser(this.uid).subscribe(user => {
      this.is_instructor = user.is_instructor;
      console.log("is_instructor", this.is_instructor);
      
      this.name_bindings_obvs= this.anonNamesProvider.getNamesObj(this.chatroom_id, this.uid, this.is_instructor);
      console.log("name_bindgs obvs", this.name_bindings_obvs);
      this.names_sub = this.name_bindings_obvs.subscribe(names => {
        this.names_arr = names;
    })
  })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  trackByFn(student){
    return student.uid;
  }

  getName(uid){
    // console.log("comment.uid: ", uid)
    // if(this.users_arr != null && this.users_arr[uid] != null){
    //   if(this.users_arr[uid].is_instructor){
    //     return 'Liger'
    //   }
    //   return 'Liger'
    // }
    if(this.names_arr != null && this.names_arr[uid] != null){
      return this.names_arr[uid].name;
    }
    return 'Liger';
  }
  

}
