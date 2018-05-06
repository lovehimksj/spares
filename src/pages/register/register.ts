import {Component} from '@angular/core';
import {
    AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,
    ToastController
} from 'ionic-angular';
import {UserService} from "../../package/service/user";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    loading: Loading;
    private email: string;
    private password: string;
    private address: string;
    private city: string;
    private country: string;
    private first_name: string;
    private last_name: string;
    private mobile: string;
    private pin: string;
    private state: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private user: UserService,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    gotToLogin() {
        this.navCtrl.push('LoginPage')
    }

    registerUser() {
        const data = {
            "address": this.address,
            "city": this.city,
            "country": this.country,
            "email": this.email,
            "first_name": this.first_name,
            "last_name": this.last_name,
            "mobile": this.mobile,
            "password": this.password,
            "pin": this.pin,
            "refer_id": "",
            "state": this.state
        };
        this.showLoading();
        this.user.register(data)
            .subscribe(value => {
                this.presentToast('Register Successfully');
                this.navCtrl.push('LoginPage');
            }, error2 => {
                this.showError(JSON.stringify(error2));
            })
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
