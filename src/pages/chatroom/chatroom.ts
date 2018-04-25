import { AfterViewChecked, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Comment } from '../../app/models/comment';
import { AlertController } from 'ionic-angular';
import { CommentslistComponent } from '../../components/commentslist/commentslist'
import { CommentProvider } from '../../providers/commentprovider/commentprovider';
import { UserProvider } from '../../providers/userprovider/userprovider';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chatroom } from '../../app/models/chatroom';
import { Observable } from 'rxjs/Observable';
import { StudentlistComponent } from '../../components/studentlist/studentlist';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateArgCount, CONSTANTS } from '@firebase/util';

@IonicPage()
@Component({
    selector: 'page-chatroom',
    templateUrl: 'chatroom.html',
})

export class ChatroomPage{
    @ViewChild('scrollMe') private commentsGrid: ElementRef;
    disableScrollDown = false;
    profanity: Array<any>
    no_profanity: boolean;
    chatroom_id: string;
    chatroom_obvs: Observable<any>;
    comment_input: string;
    course_id: string;
    course_obvs: Observable<any>;
    is_instructor: Boolean = false;
    uid: string;
    user_sub: Subscription
    access_code_raw: any;
    access_code_string: string;
    access_code_sub: Subscription;
    username: string;
    studentListDisplay: boolean = true;
    comment_control: FormGroup

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public afAuth: AngularFireAuth,
        public commentProvider: CommentProvider, public userProvider: UserProvider, public afdb: AngularFireDatabase, public modalCtrl: ModalController) {
        this.uid = this.afAuth.auth.currentUser.uid;
        this.profanity = ["fuck", "shit", "damn", "bitch"]
        this.no_profanity = true;

        this.chatroom_id = this.navParams.get('chatroom_id');
        this.course_id = this.navParams.get('course_id');
        // console.log("chatroom_id", this.chatroom_id);

        this.chatroom_obvs = this.afdb.object('chatroom/' + this.chatroom_id).valueChanges();
        this.afdb.object('chatroom/' + this.chatroom_id).update({ test: 'test' });
        // console.log('chatroom obvs', this.chatroom_obvs)
        this.chatroom_obvs.subscribe(chatroom => {
            this.access_code_string = chatroom.accessCode;
            // console.log("access code", chatroom);
        })
        this.course_obvs = this.userProvider.getUserCourse(this.uid, this.course_id);


        this.user_sub = this.userProvider.getUser(this.uid).subscribe(user => {
            this.is_instructor = user.is_instructor;
            this.username = user.username;
            // console.log("is_instructor", this.is_instructor);
        })

        this.access_code_sub = this.afdb.object('lastAccessCode').valueChanges().subscribe(access_code => {
            this.access_code_raw = access_code;
            this.access_code_string = this.access_code_raw.value;
        })

        this.comment_control = new FormGroup({
            'comment_input': new FormControl(this.comment_input, [
                Validators.minLength(1),
                Validators.required
            ])
        })
    }

    ngAfterViewChecked(){
        this.scrollToBottom();
    }

    onScroll() {
        let element = this.commentsGrid.nativeElement
        let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
        if (this.disableScrollDown && atBottom) {
            this.disableScrollDown = false;
        } else {
            // console.log("scrolling")
            this.disableScrollDown = true;
        }
    }

    /**
     * Scrolls the chat down to make the latest comments visible
     */
    scrollToBottom(): void {
        if (this.disableScrollDown) {
            return
        }
        else {
            try {
                this.commentsGrid.nativeElement.scrollTop = this.commentsGrid.nativeElement.scrollHeight;
            } catch (err) {
                // console.log(err);
            }
        }
    }

    checkProfanity() {
        for (var i = 0; i < this.profanity.length; i++) {
            if (this.comment_input.indexOf(this.profanity[i]) != -1) {
                // console.log(this.comment_input.indexOf(this.profanity[i]))
                return false;
            }
        }

        return true
    }

    addComment() {
        let comment = new Comment;
        comment.content = this.comment_input;

        if (this.checkProfanity()) {
            comment.username = this.username;
            comment.uid = this.uid;
            this.commentProvider.addComment(this.chatroom_id, comment);
            this.comment_input = '';
            this.disableScrollDown = false;
            this.scrollToBottom();
            
        }
        else {
            let alert = this.alertCtrl.create
                (({
                    title: 'Woah...',
                    subTitle: "Your comment contains profanity. Please remove it.",
                    buttons: ['Dismiss']
                }));
            alert.present()
        }
    }

    showStudentList() {
        if (this.studentListDisplay == true) {
            this.studentListDisplay = false;
        }
        else {
            this.studentListDisplay = true;
        }
    }

    showStudentListMobile() {
        this.modalCtrl.create(StudentlistComponent).present();
    }
}
