import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../app/models/user';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../app/models/course';

/*
  Generated class for the UserserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  users_path: string;
  users_ref: any;
  users: Observable<any[]>;
  user: Observable<any>;

  constructor(public afdb: AngularFireDatabase) {
    console.log('Hello UserserviceProvider Provider');
    this.users_path = 'userProfile';
    this.users_ref = this.afdb.object(this.users_path);
  }

  getUsers(): Observable<User[]> {
    this.users = this.afdb.list(this.users_path).valueChanges();
    return this.users;
  }


  getUser(user_id: string): Observable<User> {
    if(this.validate_key(user_id)){
      this.user = this.afdb.object(this.users_path + '/' + user_id).valueChanges();
      return this.user
    }
  }

  deleteUser(user_id: string): void {
    if (this.validate_key(user_id)){
      this.afdb.object(this.users_path + '/' + user_id).remove();
    }
  }

  addUser(user_id: string, user: User): void {
    if(this.validate_key(user_id)){
      this.afdb.object(this.users_path).update({[user_id]:user});
    }
  }

  //will update only a property or set of properties in that user profile
  updateUser(user_id: string, properties: {}): void {
    if(this.validate_key(user_id)){
      this.afdb.object(this.users_path + '/' + user_id).update(properties);
    }
  }

  validate_key(key: string): boolean {
    if (key != null && key != ""){
      return true;
    }
    return false;
  }

  getUserCourses(user_id: string ): Observable<any[]>{
    if(this.validate_key(user_id)){
      return this.afdb.list(this.users_path + '/' + user_id + '/courses').valueChanges();
    }
  }

  addUserCourse(user_id: string, course: Course): void {
    if(this.validate_key(user_id)){
      this.afdb.object(this.users_path + '/' + user_id + '/courses').update({[course.course_id]: course});
    }
  }

  getUserCourse(user_id: string, course_id: string): Observable<any> {
    if(this.validate_key(user_id) && this.validate_key(course_id)){
      return this.afdb.object(this.users_path + '/' + user_id + '/courses' + course_id).valueChanges();
    }
  }

  updateUserCourse(user_id: string, course_id: string, properties : {}) {
    this.afdb.object(this.users_path + '/' + user_id + '/courses' + course_id).update(properties);
  }

  deleteUserCourse(user_id: string, course_id: string): void {
    this.afdb.object(this.users_path + '/' + user_id + '/courses' + course_id).remove();
  }
}
