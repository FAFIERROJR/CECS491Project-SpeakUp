import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CommentslistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'commentslist',
  templateUrl: 'commentslist.html'
})
export class CommentslistComponent {

  comments: Observable<any[]>;
  @Injectable() chatroom_id: string;


  constructor(public afdb: AngularFireDatabase, public alertCtrl: AlertController) {
    console.log('Hello CommentslistComponent Component');
    this.comments = this.afdb.list('chatroom/' + this.chatroom_id + '/comments').valueChanges();
  }


}
