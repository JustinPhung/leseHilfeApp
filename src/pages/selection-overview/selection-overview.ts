import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { HomePage } from '../home/home';
import { TamagotchiPage } from '../tamagotchi/tamagotchi';
import { TamagotchiService } from '../../services/tamagotchi.development.service';
import { LeseruWordService } from '../../services/leseru.word.service';

/**
 * Generated class for the SelectionOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selection-overview',
  templateUrl: 'selection-overview.html',
})
export class SelectionOverviewPage {

  private status: string;  
  private showStartLeseru: boolean = false;

  constructor( private tamService: TamagotchiService,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public leseruService: LeseruWordService) {
      this.status = tamService.getNextStatus();
      this.leseruService.loadSettings();
  }

  ionViewDidLoad() {
    setInterval( ()=>{this.showStartLeseru = this.leseruService.getIsSessionInitialized()}, 100);    
  }

  public getTamagotchiStatus(): string{
    return this.status;
  }

  navigateLeseruHome(): void {
    if(this.showStartLeseru){
      this.navCtrl.push(HomePage);
    }
  }

  navigateTamagotchi(): void {
    this.navCtrl.push(TamagotchiPage);
  }

}
