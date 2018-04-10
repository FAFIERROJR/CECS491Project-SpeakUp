import { NgModule } from '@angular/core';
import { ChatroomcardsComponent } from './chatroomcards/chatroomcards';
<<<<<<< HEAD
import { CommentComponent } from './comment/comment';
@NgModule({
	declarations: [ChatroomcardsComponent,
    CommentComponent],
	imports: [],
	exports: [ChatroomcardsComponent,
    CommentComponent]
=======
import { CommentslistComponent } from './commentslist/commentslist';
import { CoursepickerComponent } from './coursepicker/coursepicker';
import { CommentComponent } from './comment/comment';
@NgModule({
	declarations: [ChatroomcardsComponent,
    CommentslistComponent,
    CoursepickerComponent,
    CommentComponent],
	imports: [],
	exports: [ChatroomcardsComponent,
    CommentslistComponent,
<<<<<<< HEAD
    CoursepickerComponent]
>>>>>>> c594233a92ac0561e10b932f2f4126b5ea7a268a
=======
    CoursepickerComponent,
    CommentComponent]
>>>>>>> bd44e0ed2606a8efe6c148e262043fb4e87fe7ac
})
export class ComponentsModule {}
