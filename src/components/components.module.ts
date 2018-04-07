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
@NgModule({
	declarations: [ChatroomcardsComponent,
    CommentslistComponent,
    CoursepickerComponent],
	imports: [],
	exports: [ChatroomcardsComponent,
    CommentslistComponent,
    CoursepickerComponent]
>>>>>>> c594233a92ac0561e10b932f2f4126b5ea7a268a
})
export class ComponentsModule {}
