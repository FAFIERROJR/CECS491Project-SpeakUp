import { NgModule } from '@angular/core';
import { ChatroomcardsComponent } from './chatroomcards/chatroomcards';
import { CommentComponent } from './comment/comment';
@NgModule({
	declarations: [ChatroomcardsComponent,
    CommentComponent],
	imports: [],
	exports: [ChatroomcardsComponent,
    CommentComponent]
})
export class ComponentsModule {}
