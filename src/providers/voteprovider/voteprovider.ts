import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Vote } from '../../app/models/vote';

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
    return this.afdb.object('chatroom/' + chatroom_id + '/comments/' + comment_id + '/vote_history').valueChanges();
  }

  addVote(chatroom_id: string, comment_id: string, vote: Vote): Promise<any> {

    let promise = new Promise((resolve, reject) => setTimeout( () =>{
      let vote_sub = this.getVoteHistory(chatroom_id, comment_id).subscribe((votes)=> {
        let vote_history = votes;
        let xpdelta: number;
        if(vote_history != null && vote_history[vote.uid] != null){
          if (vote_history[vote.uid].value == vote.value){
            xpdelta = vote.value * -1;
            vote.value = 0;
          }else if(vote_history[vote.uid].value == (vote.value * -1)){
            xpdelta = vote.value * 2
          }else{
            xpdelta = vote.value;
          }
        }
        else{
          xpdelta = vote.value;
        }
        this.afdb.object('chatroom/' + chatroom_id + '/comments/' + comment_id + '/vote_history').update({
          [vote.uid]: vote
        });
        this.afdb.database.ref('chatroom/' + chatroom_id + '/comments/' + comment_id + '/xp').transaction(vote_raw => {
          console.log("vote raw value ", vote_raw, " vote type ", typeof vote_raw)
          let value = Number(vote_raw)
          value =  value + xpdelta;
          console.log("type of value ", typeof value)
          return value;
        });
        vote_sub.unsubscribe();
      });
    }, 500));

    return promise;
  }

}
