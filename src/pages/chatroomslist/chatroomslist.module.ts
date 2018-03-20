import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatroomslistPage } from './chatroomslist';

@NgModule({
  declarations: [
    ChatroomslistPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatroomslistPage),
  ],
})
export class ChatroomslistPageModule {}
