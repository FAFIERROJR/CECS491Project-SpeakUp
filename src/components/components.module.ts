import { NgModule } from '@angular/core';
import { ChatroomcardsComponent } from './chatroomcards/chatroomcards';
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
    CoursepickerComponent,
    CommentComponent]
})
export class ComponentsModule {}