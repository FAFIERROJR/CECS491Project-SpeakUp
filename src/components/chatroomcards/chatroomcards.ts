import { Component } from '@angular/core';

/**
 * Generated class for the ChatroomcardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chatroomcards',
  templateUrl: 'chatroomcards.html'
})
export class ChatroomcardsComponent {

  text: string;

  constructor() {
    console.log('Hello ChatroomcardsComponent Component');
    this.text = 'Hello World';
  }

}
