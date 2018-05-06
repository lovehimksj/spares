import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

class UserInfo {
    address: string;
    city: string;
    country:string;
    email: string;
    first_name: string;
    id:number
    last_name: string;
    mobile: string;
    password: string;
    pin: string;
    refer_id: string;
    state: string;
    status: string;
    tno:string;
}

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    public userInfo: UserInfo = new UserInfo();
    profileName: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
    ionViewDidEnter() {
        this.storage.get('hasLoggedIn').then(value => {
            // console.log(value);
            // if (value){
            this.storage.get('user').then(value2 => {
                this.userInfo = value2;
                this.profileName = this.userInfo.first_name.charAt(0).toUpperCase() + this.userInfo.last_name.charAt(0).toUpperCase()
            })
            // }
        })
    }

    logout() {
        this.storage.remove('user').then(value => {
            this.storage.set('hasLoggedIn',false).then(value2 => {
                this.navCtrl.setRoot('HomePage');
            })
        })
    }

    goToMyOrder() {
        this.navCtrl.push('OrdersPage');
    }
}
