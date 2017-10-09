import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SignupPage} from "../signup/signup";

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
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

}
