//angular and ionic imports
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//page imports
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { ChatroomslistPage } from '../pages/chatroomslist/chatroomslist'


//firebase and angular fire imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ChatroomcardsComponent } from '../components/chatroomcards/chatroomcards';
import { ChatroomPage } from '../pages/chatroom/chatroom';
import { CoursepickerComponent } from '../components/coursepicker/coursepicker';
export const firebase_config = {
  apiKey: "AIzaSyBRZwZxFw-mfeIkrFz3R985np6jYMV8z_M",
  authDomain: "speakup-2afce.firebaseapp.com",
  databaseURL: "https://speakup-2afce.firebaseio.com",
  projectId: "speakup-2afce",
  storageBucket: "speakup-2afce.appspot.com",
  messagingSenderId: "419272516826"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    ChatroomcardsComponent,
    ChatroomslistPage,
    ChatroomPage,
    CoursepickerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase_config),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    ChatroomcardsComponent,
    ChatroomslistPage,
    ChatroomPage,
    CoursepickerComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
