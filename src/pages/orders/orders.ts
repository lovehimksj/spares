import {Component} from '@angular/core';
import {
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams,
    ToastController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {UserService} from "../../package/service/user";

class UserInfo {
    address: string;
    city: string;
    country: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    mobile: string;
    password: string;
    pin: string;
    refer_id: string;
    state: string;
    status: string;
    tno: string;
}

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html',
})
export class OrdersPage {
    public userInfo: UserInfo = new UserInfo();
    loading: Loading;
    public itemList: Array<any> = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                private user: UserService,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {

    }

    ionViewDidEnter() {
        this.storage.get('user').then(value => {
            if (value) {
                this.userInfo = value;
                this.getAllOrders(this.userInfo);
            }
        });
    }

    getAllOrders(userInfo) {
        this.showLoading();
        this.user.getOrdersByUser(userInfo)
            .subscribe(value => {
                this.itemList = value;
                this.presentToast('Orders fetched successfully');
            }, error2 => {
                this.showError(JSON.stringify(error2))
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
