import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Api} from "../../providers/api/api";
import {LoginPage} from "../login/login";
import {AddCoinPage} from "../add-coin/add-coin";

/**
 * Generated class for the PortfoliosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-portfolios',
  templateUrl: 'portfolios.html',
})
export class PortfoliosPage {
  portfolios : any;
  active_portfolio : any;
  add_coin:any;
  btc_prices:any = [];
  portfolio_value:any;
  selected_currency:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    this.add_coin = AddCoinPage;
    this.selected_currency = localStorage.getItem("currency") ? localStorage.getItem("currency") : "INR";
    this.getPortfolios(localStorage.getItem("access_token"));
    this.getBTCPrice();
  }

  getPortfolios(access_token) {
    let seq = this.api.get('portfolios?access_token='+access_token);

    seq.subscribe((res: any) => {
      //
      if (res.success == 1) {
        this.portfolios = res.data;
        this.changePortfolio(res.data[0].id);
      }
      else {
        this.navCtrl.setRoot(LoginPage);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getPortfolio(access_token,id) {
    let seq = this.api.get('portfolios/'+id+'?access_token='+access_token);

    seq.subscribe((res: any) => {
      //
      if (res.success == 1) {
        this.active_portfolio = res.data;
        this.getTotalPortfolioValue();
      }
      else {
        this.navCtrl.setRoot(LoginPage);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  changePortfolio(id) {
    let access_token = localStorage.getItem('access_token');
    this.getPortfolio(access_token,id);
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

  getBTCPrice() {
    let access_token = localStorage.getItem('access_token');
    let seq = this.api.get('coins/btc?access_token='+access_token);

    seq.subscribe((res: any) => {
      if (res.success == 1) {
        this.btc_prices =  res.data.currencies;
      }
      else {
        this.navCtrl.setRoot(LoginPage);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getBTCValue(amount,currency,selected_currency) {
    let price;
    let currency_multiple;
    //Checks if the coin is altcoin or bitcoin, if bitcoin assign price 1, if altcoin find the btc value
    if(currency && currency !== undefined && currency !== "BTC") {
      price = this.btc_prices.filter(function(value) {
        if(value.text == currency+"-BTC") {
          return value;
        }
      })[0].avg_price;
    }
    else if(currency == "BTC") {
      price = 1;
    }
    //Finds if the selected currency == currency of coin, if it is dont take the average price
    if(selected_currency && selected_currency !== undefined) {
      currency_multiple = this.btc_prices.filter(function(value) {
        if(value.text == selected_currency+"-BTC") {
          return value;
        }
      })[0].avg_price;
    }
    if(selected_currency == currency) {
      return amount;
    }
    else {
      console.log(this.btc_prices);
      return (amount/price) * currency_multiple;
    }
  }

  getTotalPortfolioValue() {
    let total_btc = 0;
    let coins = this.active_portfolio.coins;
    for(let i = 0;i<coins.length;i++) {
      total_btc = total_btc + (this.getBTCValue(coins[i].sum_amount * coins[i].exchange_coin.last_price,coins[i].exchange_coin.currency.currency_code,this.selected_currency));
    }

    this.portfolio_value = total_btc;
  }

}
