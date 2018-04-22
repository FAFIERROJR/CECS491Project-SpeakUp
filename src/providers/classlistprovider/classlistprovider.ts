//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../app/models/student';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ClasslistproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClasslistproviderProvider
{
    student: Student
    chatroom_ref: any
    user_ref: any

    constructor(public afdb: AngularFireDatabase)
    {
        console.log('Hello ClasslistproviderProvider Provider');
    }

    push(chatroom_id: string, uid: string)
    {
        this.user_ref = this.afdb.object('userProfile/' + uid);
        this.user_ref.snapshotChanges().subscribe(info =>
        {
            this.student.student_id = info.uni_id;
            this.student.username = info.username;
        });
        this.afdb.database.ref('chatroom/' + chatroom_id + '/classlist').push(this.student);
    }

    pop(chatroom_id: string, uid: string)
    {

    }

    isPresent(uid: string)
    {

    }
}
