import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SignupPage} from "../signup/signup";
import {PortfoliosPage} from "../portfolios/portfolios";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login:any;
  signup:any;

  constructor(public navCtrl: NavController, public menu:MenuController) {
    this.menu.enable(false);
    this.login = LoginPage;
    this.signup = SignupPage;

    let access_token = localStorage.getItem('access_token');
    if(access_token && access_token !== undefined) {
      this.navCtrl.setRoot(PortfoliosPage);
    }
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

}
