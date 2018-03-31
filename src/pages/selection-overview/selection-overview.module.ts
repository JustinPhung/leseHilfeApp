import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectionOverviewPage } from './selection-overview';

@NgModule({
  declarations: [
    SelectionOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectionOverviewPage),
  ],
})
export class SelectionOverviewPageModule {}
