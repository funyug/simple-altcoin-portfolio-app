import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Api} from "../../providers/api/api";
import {LoginPage} from "../login/login";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    this.getPortfolios(localStorage.getItem("access_token"));
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

}
