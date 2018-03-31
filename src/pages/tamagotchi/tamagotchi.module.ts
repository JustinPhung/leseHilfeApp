import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TamagotchiPage } from './tamagotchi';

@NgModule({
  declarations: [
    TamagotchiPage,
  ],
  imports: [
    IonicPageModule.forChild(TamagotchiPage),
  ],
})
export class TamagotchiPageModule {}
