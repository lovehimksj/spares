import {Component} from '@angular/core';
import {
    AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,
    ToastController
} from 'ionic-angular';
import {ProductService} from "../../package/service/product";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {
    loading: Loading;
    popularProduct: Object[] = [];
    ourProduct: Object[] = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private product: ProductService,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
    }

    ionViewDidEnter() {
        this.getAllDashboardProduct();
    }

    public getInput($event): void {
        if ($event.target.value) {
            console.log($event.target.value);
        }
    }

    public goToProductPage(i: any) {
        this.navCtrl.push('ProductPage', {productInfo: i})
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

    private getAllDashboardProduct() {
        this.showLoading();
        this.product.getAllProduct()
            .subscribe(value => {
                this.presentToast('Product Fetched');
                for (let i = 0; i < 10; i++) {
                    this.popularProduct.push(value[i])
                }
                for (let i = 10; i < 20; i++) {
                    this.ourProduct.push(value[i])
                }
            }, error2 => {
                this.showError(JSON.stringify(error2));
            })
    }
}
