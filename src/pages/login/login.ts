import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Api} from "../../providers/api/api";
import 'rxjs/add/operator/toPromise';
import {PortfoliosPage} from "../portfolios/portfolios";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
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
  errors : {
    email:any,
    password:any,
    incorrect_login:any
  } = {
    email:[],
    password:[],
    incorrect_login:[]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public push:Push, public platform: Platform) {
  }

  login() {
    if (this.platform.is('cordova')) {
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }

        });

      const options: PushOptions = {
        android: {},
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {},
        browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('registration').subscribe((registration: any) => this.account.device_id = registration.registrationId);
    }

      let seq = this.api.post('login', this.account);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.success == 1) {
        localStorage.setItem('access_token',res.data.access_token);
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
