import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from "../../providers/api/api";
import {LoginPage} from "../login/login";
import {PortfoliosPage} from "../portfolios/portfolios";

/**
 * Generated class for the AddCoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-coin',
  templateUrl: 'add-coin.html',
})
export class AddCoinPage {

  user_coin: { coin_id: number, exchange_id: number, entry_price: number, exit_price: number, amount: number, portfolio_id: number } = {
    coin_id: null,
    exchange_id: null,
    entry_price: null,
    exit_price: null,
    amount: null,
    portfolio_id: 1
  };
  exchanges: any;
  coins: any;
  errors : {
    portfolio_id:any,
    entry_price:any,
    coin_id:any,
    invalid_token:any,
    invalid_portfolio:any,
    amount:any,
    invalid_coin:any
  } = {
    portfolio_id:[],
    entry_price:[],
    coin_id:[],
    invalid_token:[],
    invalid_portfolio:[],
    amount:[],
    invalid_coin:[]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    let access_token = localStorage.getItem('access_token');
    this.getExchanges(access_token);
  }

  getExchanges(access_token) {
    let seq = this.api.get('exchanges?access_token=' + access_token);

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

  getExchangeCoins() {
    let access_token = localStorage.getItem('access_token');
    let seq = this.api.get('exchanges/' + this.user_coin.exchange_id + '?access_token=' + access_token);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success == 1) {
        this.coins = res.data.coins;
        console.log(this.coins);
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  addCoin(user_coin) {
    user_coin.access_token = localStorage.getItem('access_token');
    let seq = this.api.post('user_coins', user_coin);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success == 1) {
        this.navCtrl.setRoot(PortfoliosPage);
      } else {
        this.errors = res.data.errors;
        if(this.errors.invalid_token) {
          this.navCtrl.setRoot(LoginPage);
        }
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
