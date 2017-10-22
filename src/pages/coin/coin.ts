import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the CoinPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-coin',
  templateUrl: 'coin.html'
})
export class CoinPage {

  informationRoot = 'InformationPage';
  transactionsRoot = 'TransactionsPage';
  historyRoot = 'HistoryPage';


  constructor(public navCtrl: NavController) {}

}
