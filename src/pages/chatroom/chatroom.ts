import { AfterViewChecked, Component, ViewChild, ElementRef, OnInit, ContentChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, VirtualScroll } from 'ionic-angular';
import { Comment } from '../../app/models/comment';
import { AlertController, Platform } from 'ionic-angular';
import { CommentslistComponent } from '../../components/commentslist/commentslist'
import { CommentProvider } from '../../providers/commentprovider/commentprovider';
import { UserProvider } from '../../providers/userprovider/userprovider';
import { ClasslistProvider } from '../../providers/classlistprovider/classlistprovider';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chatroom } from '../../app/models/chatroom';
import { Observable } from 'rxjs/Observable';
import { StudentlistComponent } from '../../components/studentlist/studentlist';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateArgCount } from '@firebase/util';
import { OnDestroy, HostListener } from '@angular/core';
import { ChatroomsettingsComponent } from '../../components/chatroomsettings/chatroomsettings';

@IonicPage()
@Component({
    selector: 'page-chatroom',
    templateUrl: 'chatroom.html',
    host: { 'window:beforeunload': 'classlistPop' }
})


export class ChatroomPage {
    profanity: Array<any>
    no_profanity: boolean;
    chatroom_id: string;
    chatroom_obvs: Observable<any>;
    comment_input: string;
    course_id: string;
    course_obvs: Observable<any>;
    is_instructor: Boolean = false;
    uid: string;
    username: string;
    user_sub: Subscription
    access_code_raw: any;
    access_code_string: string;
    access_code_sub: Subscription;
    studentListDisplay: boolean = true;
    comment_control: FormGroup
    spamCount: any;
    cd: any;
    @ViewChild('comments') comments_list: CommentslistComponent;
    onPause_sub: Subscription;
    onResume_sub: Subscription;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public afAuth: AngularFireAuth,
        public commentProvider: CommentProvider, public userProvider: UserProvider, public classlistProvider: ClasslistProvider, public afdb: AngularFireDatabase,
        public modalCtrl: ModalController, public platform: Platform) {
        this.spamCount = 0;
        this.cd = this.spamCooldown();
        this.uid = this.afAuth.auth.currentUser.uid;
        this.profanity = ["fuck", "shit", "damn", "bitch"]
        this.no_profanity = true;

        this.uid = this.navParams.get('uid');
        this.username = this.navParams.get('username');
        this.course_id = this.navParams.get('course_id');
        this.chatroom_id = this.navParams.get('chatroom_id');
        console.log('uid: ', this.uid);
        console.log('username: ', this.username);
        console.log('course_id: ', this.course_id);
        console.log('chatroom_id: ', this.chatroom_id);

        // Classlist Push
        this.classlistProvider.push(this.chatroom_id, this.uid, this.username);

        // Classlist Push (Platform: Resume)
        this.onResume_sub = this.platform.resume.subscribe(() => {
            this.classlistProvider.push(this.chatroom_id, this.uid, this.username);
        });

        // Classlist Pop (Platform: Pause)
        this.onPause_sub = this.platform.pause.subscribe(() => {
            this.classlistProvider.pop(this.chatroom_id, this.uid);
        })

        this.chatroom_obvs = this.afdb.object('chatroom/' + this.chatroom_id).valueChanges();
        this.chatroom_obvs.subscribe(chatroom => {
            this.access_code_string = chatroom.accessCode;
            console.log("access code: ", chatroom);
        })
        this.course_obvs = this.userProvider.getUserCourse(this.uid, this.course_id);

        this.user_sub = this.userProvider.getUser(this.uid).subscribe(user => {
            this.is_instructor = user.is_instructor;
            this.username = user.username;
            console.log("is_instructor: ", this.is_instructor);
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

        if (this.checkProfanity() && this.spamCount < 3 )
        {
            comment.username = this.username;
            comment.uid = this.uid;
            this.commentProvider.addComment(this.chatroom_id, comment);
            this.comment_input = '';
            // this.disableScrollDown = false;
            // this.scrollToBottom();
            this.spamCount++;

        }
        else if (this.spamCount >= 3)
        {
            let alert = this.alertCtrl.create
                (({
                    title: 'Slow down kiddo!',
                    subTitle: "Your spam is not welcome here.",
                    buttons: ['Dismiss']
                }));
            alert.present()
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

        this.comments_list.scrollToBottom();

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
        this.modalCtrl.create(StudentlistComponent, {chatroom_id: this.chatroom_id}).present();
    }

    // Classlist Pop (ionView: Did Leave)
    ionViewDidLeave() {
        this.classlistProvider.pop(this.chatroom_id, this.uid);

        this.onResume_sub.unsubscribe();
        this.onPause_sub.unsubscribe();
    }

    // Classlist Pop (ng: Destroy)
    ngOnDestroy() {
        this.classlistProvider.pop(this.chatroom_id, this.uid);

        this.onResume_sub.unsubscribe();
        this.onPause_sub.unsubscribe();
    }

    // Classlist Pop (HostListener: Before Unload)
    @HostListener('window:beforeunload')
    classlistPop() {
        this.classlistProvider.pop(this.chatroom_id, this.uid);

        this.onResume_sub.unsubscribe();
        this.onPause_sub.unsubscribe();
    }

    decSpam() {
        if (this.spamCount > 0) {
            this.spamCount--;
        }
    }

    spamCooldown() {
        setInterval(() => this.decSpam(), 5000);

    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.comments_list.scrollToBottom();
        }, 800);
    }

    chatroomSettings(){
        this.modalCtrl.create(ChatroomsettingsComponent).present();
    }

    showAccessCode() {
        let alert = this.alertCtrl.create({
          title: 'Access Code',
          subTitle: this.access_code_string,
          buttons: ['Dismiss']
        });
        alert.present();
      }
    
}
