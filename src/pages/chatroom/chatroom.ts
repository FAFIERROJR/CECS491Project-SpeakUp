import { AfterViewChecked, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Comment } from '../../app/models/comment';
import { AlertController } from 'ionic-angular';
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

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
  host: {'window:beforeunload':'classlistPop'}
})


export class ChatroomPage
{
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
    username: string;
    user_sub: Subscription
    access_code_raw: any;
    access_code_string: string;
    access_code_sub: Subscription;
    studentListDisplay: boolean = false;
    comment_control: FormGroup
    spamCount: any;
    cd: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public afAuth: AngularFireAuth,
        public commentProvider: CommentProvider, public userProvider: UserProvider, public classlistProvider: ClasslistProvider, public afdb: AngularFireDatabase, public modalCtrl: ModalController)
    {
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

        if (this.checkProfanity() && this.spamCount < 10 )
        {
            comment.username = this.username;
            comment.uid = this.uid;
            this.commentProvider.addComment(this.chatroom_id, comment);
            this.comment_input = '';
            this.spamCount++;

        }
        else if (this.spamCount >= 10)
        {
            let alert = this.alertCtrl.create
            (({
                title: 'Slow down kiddo!',
                subTitle: "Your spam is not welcome here.",
                buttons: ['Dismiss']
            }));
        alert.present()
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

        this.disableScrollDown = false;
        this.scrollToBottom();
    }

    showStudentList()
    {
        if(this.studentListDisplay == false){
            this.studentListDisplay = true;
        }
        else {
            this.studentListDisplay = false;
        }
    }

    showStudentListMobile()
    {
        this.modalCtrl.create(StudentlistComponent).present();
    }

    // Classlist Pop
    ionViewDidLeave()
    {
        this.classlistProvider.pop(this.chatroom_id, this.uid);
    }

    // Classlist Pop
    ngOnDestroy()
    {
        this.classlistProvider.pop(this.chatroom_id, this.uid);
    }

    // Classlist Pop
    @HostListener('window:beforeunload')
    classlistPop()
    {
        this.classlistProvider.pop(this.chatroom_id, this.uid);
    }
    decSpam(){
        if (this.spamCount > 0){
            this.spamCount--;
        }
    }

    spamCooldown(){
        setInterval(() => this.decSpam() , 5000);

    }

}
