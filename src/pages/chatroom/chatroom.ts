import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comment } from '../../app/models/comment';
import { AlertController } from 'ionic-angular';
import {CommentslistComponent } from '../../components/commentslist/commentslist'
import { CommentProvider } from '../../providers/commentprovider/commentprovider';
import { UserProvider } from '../../providers/userprovider/userprovider';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chatroom } from '../../app/models/chatroom';
import { Observable } from 'rxjs/Observable';

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
    chatroom_obvs: Observable<any>;
    comment_input: string;
    course_id: string;
    course_obvs: Observable<any>;
    is_instructor: Boolean =false;
    uid: string;
    user_sub: Subscription
    access_code_raw: any;
    access_code_string: string;
    access_code_sub: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public afAuth: AngularFireAuth,
        public commentProvider: CommentProvider, public userProvider: UserProvider, public afdb: AngularFireDatabase)
    {
        this.uid = this.afAuth.auth.currentUser.uid;
        this.profanity = ["fuck", "shit", "damn", "bitch"]
        this.no_profanity = true;

        this.currentComment = new Comment
        this.currentComment.content = "fuck you"

        this.chatroom_id = this.navParams.get('chatroom_id');
        this.course_id = this.navParams.get('course_id');
        console.log("chatroom_id", this.chatroom_id);

        this.chatroom_obvs = this.afdb.object('chatroom/' + this.chatroom_id).valueChanges();
        this.afdb.object('chatroom/' + this.chatroom_id).update({test: 'test'});
        console.log('chatroom obvs', this.chatroom_obvs)
        this.chatroom_obvs.subscribe(chatroom => {
            console.log("access code", chatroom);
        })
        this.course_obvs = this.userProvider.getUserCourse(this.uid, this.course_id);


        this.user_sub = this.userProvider.getUser(this.uid).subscribe(user => {
            this.is_instructor = user.is_instructor;
            console.log("is_instructor", this.is_instructor);
        })

        this.access_code_sub = this.afdb.object('lastAccessCode').valueChanges().subscribe(access_code => {
            this.access_code_raw = access_code;
            this.access_code_string = this.access_code_raw.value;
        })
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
        this.comment_input="";
    }
}
