import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the VoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VoteProvider {

  constructor(public afdb: AngularFireDatabase) {
    console.log('Hello VoteProvider Provider');

  }
  getVoteHistory(chatroom_id: string, comment_id: string): Observable<any>{
    return this.afdb.object('chatroom/' + chatroom_id + '/comments/' + comment_id).valueChanges();
  }

  addVote(chatroom_id: string, comment_id: string, vote_id: string, vote_value: number): Promise<any> {
    let promise = new Promise((resolve, reject) => setTimeout( () =>{
      this.afdb.database.ref('chatroom/' + chatroom_id + '/comments/' 
          + comment_id + '/vote_history/' + vote_id).transaction(vote => {
            vote = vote + vote_value;
            return vote;
          });
    }, 500));

    return promise;
  }

}
