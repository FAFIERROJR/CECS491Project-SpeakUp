import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comment } from '../../app/models/comment';
import { AlertController } from 'ionic-angular';
import {CommentslistComponent } from '../../components/commentslist/commentslist'
import { CommentProvider } from '../../providers/commentprovider/commentprovider';

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
    chatroom_id: string;
    comment_input: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public commentProvider: CommentProvider)
    {
        this.profanity = ["fuck", "shit", "damn", "bitch"]
        this.no_profanity = true;

        this.currentComment = new Comment
        this.currentComment.content = "fuck you"

        this.chatroom_id = this.navParams.get('chatroom_id');
        console.log("chatroom_id", this.chatroom_id);

    }

    checkProfanity()
    {
        this.userInput = this.currentComment.content

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

                this.no_profanity = false;
                console.log(this.userInput.indexOf(this.profanity[i]))
            }
            else
            {
                this.no_profanity = true;
                console.log(this.userInput.indexOf(this.profanity[i]));
            }
        }

        if (this.no_profanity)
        {
            // this.send();
        }
    }

    addComment(){
        let comment = new Comment;
        comment.content = this.comment_input;
        this.commentProvider.addComment(this.chatroom_id, comment);
    }
}
