import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { IonicStorageModule, Storage } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RandomWordService } from '../services/random.word.service';
import { MenuePage } from '../pages/menue/menue';
import { TamagotchiPage } from '../pages/tamagotchi/tamagotchi';
import { TamagotchiService } from '../services/tamagotchi.development.service';
import { DatabaseService } from '../services/database.service';
import { Settings } from '../services/settings';
import { Items } from '../services/items';
import { SelectionOverviewPage } from '../pages/selection-overview/selection-overview';
import { LeseruWordService } from '../services/leseru.word.service';

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {});
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TamagotchiPage,
    SelectionOverviewPage,
    MenuePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TamagotchiPage,
    SelectionOverviewPage,
    MenuePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RandomWordService,
    TamagotchiService,
    DatabaseService,
    LeseruWordService,
    Items,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast
  ]
})
export class AppModule {}
