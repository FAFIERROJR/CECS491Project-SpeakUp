//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../app/models/student';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserProvider } from '../../providers/userprovider/userprovider';
import { Subscription } from 'rxjs/Subscription';

/*
  Generated class for the ClasslistproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClasslistProvider
{
    student: Student
    classlist_ref: any

    constructor(public afdb: AngularFireDatabase, public userProvider: UserProvider)
    {
        console.log('Hello ClasslistProvider Provider');
    }

    push(chatroom_id: string, uid: string, username: string)
    {
        this.student = new Student;
        this.student.uid = uid
        this.student.username = username

        if (this.validate_key(chatroom_id) && this.validate_key(uid))
        {
            this.classlist_ref = this.afdb.list('chatroom/' + chatroom_id + '/classlist');
            this.student.student_id = this.classlist_ref.push(this.student).key;
        }
    }

    pop(chatroom_id: string, uid: string)
    {
        if (this.validate_key(chatroom_id) && this.validate_key(uid))
        {
            this.classlist_ref.remove(this.student.student_id);
        }
    }

    getClasslist(chatroom_id: string)
    {
        return this.afdb.list('chatroom/' + chatroom_id + '/classlist', ref => ref.orderByChild('uid')).valueChanges();
    }

    validate_key(key: string): boolean
    {
        if (key != null && key != "")
        {
            console.log("key valid");
            return true;
        }
        return false;
    }
}
