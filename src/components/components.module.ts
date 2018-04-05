import { NgModule } from '@angular/core';
import { ChatroomcardsComponent } from './chatroomcards/chatroomcards';
import { CommentslistComponent } from './commentslist/commentslist';
@NgModule({
	declarations: [ChatroomcardsComponent,
    CommentslistComponent],
	imports: [],
	exports: [ChatroomcardsComponent,
    CommentslistComponent]
})
export class ComponentsModule {}
