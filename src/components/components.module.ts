import { NgModule } from '@angular/core';
import { ChatroomcardsComponent } from './chatroomcards/chatroomcards';
import { CommentslistComponent } from './commentslist/commentslist';
import { CoursepickerComponent } from './coursepicker/coursepicker';
import { CommentComponent } from './comment/comment';
import { StudentlistComponent } from './studentlist/studentlist';
import { ChatroomslistComponent } from './chatroomslist/chatroomslist';
@NgModule({
	declarations: [ChatroomcardsComponent,
    CommentslistComponent,
    CoursepickerComponent,
    CommentComponent,
    StudentlistComponent,
    ChatroomslistComponent],
	imports: [],
	exports: [ChatroomcardsComponent,
    CommentslistComponent,
    CoursepickerComponent,
    CommentComponent,
    StudentlistComponent,
    ChatroomslistComponent]
})
export class ComponentsModule {}