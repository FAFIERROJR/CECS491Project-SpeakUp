import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
import { Course } from '../../app/models/course';

/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseProvider {
  departments: Observable<any[]>;
  course_numbers: Observable<any[]>;
  sections: Observable<any[]>;
  courses: Observable<any[]>;
  course: Observable<any>;

  constructor(public afdb: AngularFireDatabase) {
    console.log('Hello CourseProvider Provider');
  }

  getDepartments(): Observable<any[]>{
    this.departments = this.afdb.list('course').valueChanges();
    return this.departments;
  }

  addDepartment(department: string): Promise<any> {
    let promise = new Promise((resolve, reject) => setTimeout(() => {
      if(this.validate_key(department)){
        this.afdb.object('course').update({
          [department]: {
            key: department
          }
        });
        resolve();
      }else{
        reject();
      }
    }, 1000));
    return promise;
    
  }

  getCourseNumbers(department: string): Observable<any[]>{
    if(this.validate_key(department)){
      console.log('department', department);
      this.course_numbers = this.afdb.list('course/' + department).valueChanges();
      return this.course_numbers;
    }
  }

  addCourseNumber(department: string, course_number: string): Promise<any> {
    let keys = [department, course_number];
    let promise = new Promise((resolve, reject) => setTimeout(() => {
      if(this.validate_keys(keys)){
        this.afdb.object('course/' + department).update({
          [course_number]: {
            key: course_number
          }
        });
        resolve();
      }else{
        reject();
      }
    }, 1000));
    return promise;
    
  }

  getSections(department: string, course_number: string): Observable<any[]>{
    let keys = [department, course_number]
    if(this.validate_keys(keys)){
      this.sections = this.afdb.list('course/' + department + '/' + course_number).valueChanges();
      return this.sections;
    }
  }

  addSection(department: string, course_number: string, section: string): Promise<any> {
    let keys = [department, course_number, section ];
    let promise = new Promise((resolve, reject) => setTimeout(() => {
      if(this.validate_keys(keys)){
        this.afdb.object('course/' + department + '/' + course_number).update({
          [section]: {
            key: section
          }
        });
        resolve();
      }else{
        reject();
      }
    }, 1000));
    return promise;
    
  }

  getCourses(department: string, course_number: string, section: string ): Observable<any[]>{
    let keys = [department, course_number, section]
    if(this.validate_keys(keys)){
      this.courses = this.afdb.list('course/' + department + '/' + course_number + '/' + section).valueChanges();
      return this.courses;
    }
  }

  getCourse(department: string, course_number: string, section: string, course_id: string ): Observable<any>{
    let keys = [department, course_number, section, course_id]
    if(this.validate_keys(keys)){
      this.course = this.afdb.object('course/' + department + '/' + course_number + '/' + section + '/' + course_id).valueChanges();
      return this.course;
    }
  }

  addCourse(department: string, course_number: string, section: string, course: Course): Promise<any>{
    let keys = [department, course_number, section]
    let promise = new Promise((resolve, reject) => setTimeout(() => {
      if(this.validate_keys(keys)){
        let course_id = this.afdb.database.ref('course/' + department + '/' + course_number + '/' + section).push(course).key;
        this.updateCourse(department, course_number, section, course_id, {course_id : course_id});
        resolve(course_id);
      }else{
        reject();
      }
    }, 1000));
    return promise;
  }

  deleteCourse(department: string, course_number: string, section: string, course_id: string ): Promise<any>{
    let keys = [department, course_number, section, course_id]
    let promise = new Promise((resolve, reject) => setTimeout(() => {
      if(this.validate_keys(keys)){
        this.afdb.object('course/' + department + '/' + course_number + '/' + section + '/' + course_id).remove();
        resolve();
      }else{
        reject();
      }
    }, 1000));
    return promise;
  }

  updateCourse(department: string, course_number: string, section: string, course_id: string, properties: {}): Promise<any>{
    let keys = [department, course_number, section, course_id]
    let promise = new Promise((resolve, reject) => setTimeout(() => {
      if(this.validate_keys(keys)){
        this.afdb.object('course/' + department + '/' + course_number + '/' + section + '/' + course_id).update(properties);
        resolve();
      }else{
        reject();
      }
    }, 1000));
    return promise;
  }

  validate_keys(keys: string[]){
    for(let key of keys){
      if(!this.validate_key(key)){
        return false;
      }
    }
    return true;
  }

  validate_key(key: string): boolean {
    if (key != null && key != ""){
      console.log("key valid");
      return true;
    }
    return false;
  }

}
