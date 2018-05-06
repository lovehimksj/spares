import {Component, OnInit} from '@angular/core';
import {
    AlertController, IonicPage, Loading, LoadingController, NavController, NavParams,
    ToastController
} from 'ionic-angular';
import {ProductService} from "../../package/service/product";
import {Cart} from "../../package/cart/spareCart";
import {CartViewPage} from "../cart-view/cart-view";

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-category',
    templateUrl: 'category.html',
})
export class CategoryPage implements OnInit {
    pageTitle: string = '';
    public itemsCountInCart: number;
    private pageInfo: any;
    private products: any;
    loading: Loading;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private product: ProductService,
                private cart: Cart,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController) {
    }

    ngOnInit(): void {
    }

    ionViewDidEnter() {
        this.updateCart();
    }

    ionViewDidLoad() {
        this.pageInfo = this.navParams.get('pageInfo');
        this.pageTitle = this.pageInfo.value;
        console.log(this.pageInfo);
        this.getProductById(this.pageInfo.key);
    }

    getProductById(id) {
        this.showLoading();
        this.product.getProductByCategoryId(id)
            .subscribe(value => {
                this.products = value;
                console.log(value);
                this.presentToast('Product fetched')
            }, error2 => {
                this.showError(error2);
                console.log(error2)
            })
    }

    public updateCart() {
        // this.showLoading();
        this.cart.getAllItemsCount().then(value => {
            console.log(value);
            if (value) {
                this.itemsCountInCart = value;
                // this.presentToast(`Cart updated with ${this.itemsCountInCart} Items`)
            } else {
                // this.loading.dismiss();
            }
        })
    }

    public goToProductPage(i: any) {
        i["addButtonState"] = 'idle';
        this.navCtrl.push('ProductPage', {productInfo: i})
    }


    public goToCartView() {
        this.navCtrl.push('CartViewPage')
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
