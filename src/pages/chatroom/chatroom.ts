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
    no_profanity: boolean;
    chatroom_id: string;
    comment_input: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public commentProvider: CommentProvider)
    {
        this.profanity = ['fuck', 'shit', 'damn', 'bitch']
        this.no_profanity = true;

        this.chatroom_id = this.navParams.get('chatroom_id');
        console.log("chatroom_id", this.chatroom_id);

    }

    checkProfanity()
    {
        for (var i = 0; i < this.profanity.length; i++)
        {
            if (this.comment_input.indexOf(this.profanity[i]) != -1)
            {
                console.log(this.comment_input.indexOf(this.profanity[i]))
                return false;
            }
        }

        return true
    }

    addComment()
    {
        let comment = new Comment;
        comment.content = this.comment_input;

        if (this.checkProfanity())
        {
            this.commentProvider.addComment(this.chatroom_id, comment);
            this.comment_input = '';
        }
        else
        {
            let alert = this.alertCtrl.create
                (({
                    title: 'Woah...',
                    subTitle: "Your comment contains profanity. Please remove it.",
                    buttons: ['Dismiss']
                }));
            alert.present()
        }
    }
}
