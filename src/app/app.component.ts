import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { ChatroomPage } from '../pages/chatroom/chatroom';
import { IndexLandingPage } from '../pages/index-landing/index-landing';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LandingPage; //uncomment when building web
  //rootPage:any = LandingPage; //uncomment when building android or ios
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, db: AngularFireDatabase) {
    platform.ready().then(() => {
      // if (platform.is('ios') || platform.is('android')) {
      //   this.rootPage = LandingPage;
      // }
      // else{
      //   this.rootPage = IndexLandingPage;
      // }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }
}

