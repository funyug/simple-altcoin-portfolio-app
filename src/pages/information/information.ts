import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Api} from "../../providers/api/api";
import {LoginPage} from "../login/login";

/**
 * Generated class for the InformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {
  access_token : any = localStorage.getItem('access_token');
  coin:any = {};
  exchanges:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:Api) {
    this.getCoinInfo("btc");
    this.getExchangeInfo("btc");
  }

  getCoinInfo(coin) {
    let seq = this.api.get('coins/'+coin+"?access_token="+this.access_token);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success == 1) {
        this.coin = res.data;
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  getExchangeInfo(coin) {
    let seq = this.api.get('coins/'+coin+"/exchanges?access_token="+this.access_token);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success == 1) {
        this.exchanges = res.data;
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
