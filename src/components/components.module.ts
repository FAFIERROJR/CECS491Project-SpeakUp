import { NgModule } from '@angular/core';
import { ChatroomcardsComponent } from './chatroomcards/chatroomcards';
import { CommentslistComponent } from './commentslist/commentslist';
import { CoursepickerComponent } from './coursepicker/coursepicker';
import { CommentComponent } from './comment/comment';
import { StudentlistComponent } from './studentlist/studentlist';
import { ChatroomslistComponent } from './chatroomslist/chatroomslist';
import { ChatroomsettingsComponent } from './chatroomsettings/chatroomsettings';
@NgModule({
	declarations: [ChatroomcardsComponent,
    CommentslistComponent,
    CoursepickerComponent,
    CommentComponent,
    StudentlistComponent,
    ChatroomslistComponent,
    ChatroomsettingsComponent],
	imports: [],
	exports: [ChatroomcardsComponent,
    CommentslistComponent,
    CoursepickerComponent,
    CommentComponent,
    StudentlistComponent,
    ChatroomslistComponent,
    ChatroomsettingsComponent]
})
export class ComponentsModule {}