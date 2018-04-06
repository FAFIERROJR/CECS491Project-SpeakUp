import { NgModule } from '@angular/core';
import { ChatroomcardsComponent } from './chatroomcards/chatroomcards';
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
})
export class ComponentsModule {}
