import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
<<<<<<< HEAD
import { AngularFireDatabase } from 'angularfire2/database';
import { Comment } from '../../app/models/comment';

/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
=======
import { Comment } from '../../app/models/comment';
import { AlertController } from 'ionic-angular';
>>>>>>> c594233a92ac0561e10b932f2f4126b5ea7a268a

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})

export class ChatroomPage
{
    profanity: Array<any>
    currentComment: Comment
    userInput: any
    no_profanity: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController)
    {
        this.profanity = ["fuck", "shit", "damn", "bitch"]
        this.no_profanity = true;

        this.currentComment = new Comment
        this.currentComment.content = "fuck you"
    }

    checkProfanity()
    {
        this.userInput = this.currentComment.content

<<<<<<< HEAD
  commentDBRef: any;
  comm: Comment;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public afdb: AngularFireDatabase) {
  }
=======
        for (var i = 0; i < this.profanity.length; i++)
        {
            if (this.userInput.indexOf(this.profanity[i]) != -1)
            {
                let alert = this.alertCtrl.create
                (({
                    title: 'Profanity Alert',
                    subTitle: "Your comment contains profanity. Please remove it.",
                    buttons: ['Dismiss']
                }));
                alert.present()
>>>>>>> c594233a92ac0561e10b932f2f4126b5ea7a268a

                this.no_profanity = false;
                console.log(this.userInput.indexOf(this.profanity[i]))
            }
            else
            {
                this.no_profanity = true;
                console.log(this.userInput.indexOf(this.profanity[i]));
            }
        }

<<<<<<< HEAD

  createComment(){
    let commentDBRef = this.afdb.object('chatroom/commentID/comment');

    commentDBRef.update
    ({
        [this.comm.comment_id]: this.comm
    })

  }

=======
        if (this.no_profanity)
        {
            // this.send();
        }
    }
>>>>>>> c594233a92ac0561e10b932f2f4126b5ea7a268a
}
