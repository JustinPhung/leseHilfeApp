import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Items } from '../../services/items';
import { Item } from '../../models/item';

/**
 * Generated class for the MenuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menue',
  templateUrl: 'menue.html',
})
export class MenuePage {

  currentItems: Item[];
  
    constructor(public navCtrl: NavController, public items: Items) {
      this.currentItems = this.items.query();
    }
  
    /**
     * The view loaded, let's query our items for the list
     */
    ionViewDidLoad() {
    }
  
    /**
     * Navigate to the detail page for this item.
     */
    openItem(item: Item) {
      this.navCtrl.push('ItemDetailPage', {
        item: item
      });
    }

}
