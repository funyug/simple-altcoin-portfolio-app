import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Api} from "../../providers/api/api";
import 'rxjs/add/operator/toPromise';
import {PortfoliosPage} from "../portfolios/portfolios";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account: { email: string, password: string, device_id: string } = {
    email: '',
    password: '',
    device_id: "1"
  };
  errors: {
    email: any,
    password: any,
    incorrect_login: any
  } = {
    email: [],
    password: [],
    incorrect_login: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
  }

  login() {
    this.account.device_id = localStorage.getItem('device_id');
    let seq = this.api.post('login', this.account);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success == 1) {
        localStorage.setItem('access_token', res.data.access_token);
        this.navCtrl.setRoot(PortfoliosPage);
      } else {
        this.errors = res.data.errors;
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
