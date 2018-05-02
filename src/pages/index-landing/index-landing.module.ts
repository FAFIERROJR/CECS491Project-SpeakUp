import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexLandingPage } from './index-landing';

@NgModule({
  declarations: [
    IndexLandingPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexLandingPage),
  ],
})
export class IndexLandingPageModule {}
