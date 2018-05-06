import {Component, ViewChild} from '@angular/core';
import {
    AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,
    ToastController
} from 'ionic-angular';
import {UserService} from "../../package/service/user";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    @ViewChild('email') email: any;
    loading: Loading;
    private username: string;
    private password: string;
    private error: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private user: UserService,
                private storage: Storage,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController) {
    }

    ionViewDidLoad(): void {
        setTimeout(() => {
            this.email.setFocus();
        }, 500);
    }

    login() {
        const data = {};
        data["username"] = this.username;
        data["password"] = this.password;
        console.log(data);
        this.showLoading();
        this.user.login(data)
            .subscribe(value => {
                value['password'] = this.password;
                this.storage.set('user', value)
                    .then(value2 => {
                        this.storage.set('hasLoggedIn', true).then(value3 => {
                            this.presentToast('Logged in successfully');
                            this.navCtrl.push('CheckoutPage');
                        })
                    });
            }, error2 => {
                this.showError(JSON.stringify(error2));
            })
    }

    gotToRegister() {
        this.navCtrl.push('RegisterPage')
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: false
        });
        this.loading.present();
    }

    showError(text) {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }

    presentToast(msg: any) {
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }
}
