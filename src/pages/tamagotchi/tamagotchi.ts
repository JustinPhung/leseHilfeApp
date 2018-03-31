import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TamagotchiService } from '../../services/tamagotchi.development.service';

/**
 * Generated class for the TamagotchiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tamagotchi',
  templateUrl: 'tamagotchi.html',
})
export class TamagotchiPage {

  private nextStatus:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tamService: TamagotchiService, private toastCtrl: ToastController ) {
    this.nextStatus = tamService.getNextStatus();
  }

  ionViewDidLoad() {
    //this.presentToast();
    setInterval( ()=>{this.nextStatus = this.tamService.getNextStatus()}, 3000);    
  }

  public getTamagotchiStatus(){
    return this.nextStatus;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'view loaded successfully',
      duration: 3000,
      position: 'middle',
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


}
