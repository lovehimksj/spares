import {Component} from '@angular/core';
import {
    AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,
    ToastController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {UserService} from "../../package/service/user";
import {Cart} from "../../package/cart/spareCart";

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html',
})
export class CheckoutPage {
    private userInfo: Object = {};
    private productInCart: Object[] = [];
    loading: Loading;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private cart: Cart,
                private storage: Storage,
                private user : UserService,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController) {
    }

    /*ionViewDidLoad() {
        this.storage.get('user').then(value => {
            if (value) {
                this.userInfo = value;
            }
        });
        console.log('ionViewDidLoad CheckoutPage');
    }*/

    ionViewDidEnter() {
        this.storage.get('user').then(value => {
            if (value) {
                this.userInfo = value;
            }
        });
        this.storage.get('cartItems').then(value => {
            if (value) {
                this.productInCart = value;
            }
        });
    }

    checkout() {
        const data = {
            "billingDetails": {
                "address": this.userInfo['address'],
                "city": this.userInfo['city'],
                "country": "india",
                "cust_id": this.userInfo['id'],
                "email": this.userInfo['email'],
                "first_name": this.userInfo['first_name'],
                "id": this.userInfo['id'],
                "last_name": this.userInfo['last_name'],
                "mobile": this.userInfo['mobile'],
                "pincode": this.userInfo['pin'],
                "state": this.userInfo['state'],
                "order_id": 0,
                "refer_id": "test1234"
            },
            "products": this.productInCart,
            "shippingDetails": {
                "address": this.userInfo['address'],
                "city": this.userInfo['city'],
                "country": "india",
                "cust_id": this.userInfo['id'],
                "email": this.userInfo['email'],
                "first_name": this.userInfo['first_name'],
                "id": this.userInfo['id'],
                "last_name": this.userInfo['last_name'],
                "mobile": this.userInfo['mobile'],
                "pincode": this.userInfo['pin'],
                "state": this.userInfo['state'],
                "order_id": 0,
                "refer_id": "test1234"
            }
        };
        this.showLoading();
        this.user.checkOutProcess(data, this.userInfo)
            .subscribe(value => {
                this.presentToast('Order Placed Successfully');
                this.cart.emptyCart().then(value2 => {
                    // console.log(value2);
                    if(value2) {
                        this.navCtrl.setRoot('DashboardPage');
                    }
                })
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
