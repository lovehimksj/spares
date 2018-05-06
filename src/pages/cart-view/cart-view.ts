import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Cart} from "../../package/cart/spareCart";
import {UserProvider} from "../../package/provider/userProvider";
import {CheckoutPage} from "../checkout/checkout";

/**
 * Generated class for the CartViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-cart-view',
    templateUrl: 'cart-view.html',
})
export class CartViewPage {
    public itemList: Object = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private cart: Cart,
        private userProvider: UserProvider
        ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CartViewPage');
    }

    ionViewDidEnter() {
        this.updateCart();
    }

    updateCart() {
        this.cart.getItemsFromCart().then(value => {
            console.log(value);
            this.itemList = value;
        });
    }

    public goToProductPage(i: any) {
        this.navCtrl.push('ProductPage', {productInfo: i})
    }

    public goToDashboard() {
        this.navCtrl.setRoot('DashboardPage')
    }

    public goToCheckOut() {
        this.userProvider.hasLoggedIn().then(value => {
            console.log(value);
            if(!value) {
                this.navCtrl.push('LoginPage');
            } else {
                this.navCtrl.push('CheckoutPage');
            }
        }, reason => {
            console.log(reason);
        })
    }

    public decreaseItem(item) {
        item.quantity -= 1;
        if (!isNaN(parseFloat(item.price))) {
            item.totalPrice = item.quantity * parseFloat(item.price);
        } else {
            item.totalPrice = '';
            item.price = '';
        }
        this.cart.decreaseItemInCart(item).then(value => {
            console.log("decreaseItemInCart");
            console.log(value);
            // if(value) {
            this.cart.getItemsFromCart().then(value => {
                console.log(value);
                this.itemList = value;
            });
            // }
        })
    }

    public increaseItem(item) {
        item.quantity += 1;
        if (!isNaN(parseFloat(item.price))) {
            item.totalPrice = item.quantity * parseFloat(item.price);
        } else {
            item.totalPrice = '';
            item.price = '';
        }
        this.cart.increaseItemInCart(item).then(value => {
            // if(value) {
            console.log("increaseItemInCart");
            console.log(value);
            this.cart.getItemsFromCart().then(value => {
                console.log(value);
                this.itemList = value;
            });
            // }
        })
    }

    public removeItem(item) {
        this.cart.removeItemFromCart(item).then(value => {
            // if(value) {
            console.log("removeItemFromCart");
            console.log(value);
            this.cart.getItemsFromCart().then(value => {
                console.log(value);
                this.itemList = value;
            });
            // }
        })
    }
}
