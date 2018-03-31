import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TamagotchiPage } from '../pages/tamagotchi/tamagotchi';
import { HomePage } from '../pages/home/home';
import { MenuePage } from '../pages/menue/menue';
import { SelectionOverviewPage } from '../pages/selection-overview/selection-overview';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;  

  rootPage:any = SelectionOverviewPage;
  pages: any[] = [
    { title: 'Start ', component: SelectionOverviewPage },    
    { title: 'Leseru', component: HomePage},
    { title: 'Tamagotchi', component: TamagotchiPage },
  ]
  constructor(platform: Platform, public menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

