import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../../app/models/comment'

/*
  Generated class for the CommentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentProvider {
 
  constructor(public afdb: AngularFireDatabase) {
    console.log('Hello CommentProvider Provider');

  }

  getComments(chatroom_id: string): Observable<any[]> {
    if(this.validate_key(chatroom_id)){
      let comments = this.afdb.list('chatroom/' + chatroom_id + '/comments').valueChanges();
      return comments;
    }
  }

  getComment(chatroom_id: string, comment_id: string): Observable<any> {
    if(this.validate_key(chatroom_id) && this.validate_key(comment_id)){
      console.log('chatroom_id, comment_id', chatroom_id, comment_id);
      let comment = this.afdb.object('chatroom/' + chatroom_id + '/comments/' + comment_id).valueChanges();
      return comment;
    }
  }

  addComment(chatroom_id: string, comment: Comment): Promise<any> {
    let promise = new Promise((resolve, reject) => setTimeout(() => {
      if(this.validate_key(chatroom_id)){
        let comment_id = this.afdb.database.ref('chatroom/' + chatroom_id + '/comments').push(comment).key;
        this.afdb.object('chatroom/' + chatroom_id + '/comments/' + comment_id).update({comment_id: comment_id});
        resolve();
      }else{
        reject();
      }
    }, 1000));
    return promise;
  }

  deleteComment(chatroom_id: string, comment_id: string): Promise<any> {
    let promise = new Promise((resolve, reject) => setTimeout(() => {
      if(this.validate_key(chatroom_id) && this.validate_key(comment_id)){
        this.afdb.object('chatroom/' + chatroom_id + '/comments/' + comment_id).remove(); 
        resolve();
      }else{
        reject();
      }
    }, 1000));
    return promise;
  }

  updateComment(chatroom_id: string, comment_id: string, properties): Promise<any> {
    let promise = new Promise((resolve, reject) => setTimeout(() => {
      if(this.validate_key(chatroom_id) && this.validate_key(comment_id)){
        this.afdb.object('chatroom/' + chatroom_id + '/comments/' + comment_id).update(properties); 
        resolve();
      }else{
        reject();
      }
    }, 1000));
    return promise;
  }

  validate_key(key: string): boolean {
    if (key != null && key != ""){
      console.log("key valid");
      return true;
    }
    return false;
  }
}
