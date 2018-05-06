import {Component, OnInit, ViewChild} from '@angular/core';
import {
    AlertController, App, IonicPage, Loading, LoadingController, MenuController, Nav, NavController,
    ToastController
} from 'ionic-angular';
import {ProductService} from "../../package/service/product";
import {CategoryPage} from "../category/category";
import {Storage} from "@ionic/storage";

class UserInfo {
    address: string;
    city: string;
    country:string;
    email: string;
    first_name: string;
    id:number;
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
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage implements OnInit {
    rootPage: any;
    // profileName: string;
    @ViewChild(Nav) nav: Nav;
    private pages: any;
    loading: Loading;
    popularProduct: Object[] = [];
    ourProduct: Object[] = [];
    public userInfo: UserInfo = new UserInfo();
    profileName: string = '';

    constructor(public navCtrl: NavController,
                menu: MenuController,
                private product: ProductService,
                private storage: Storage,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController) {
        this.rootPage = 'DashboardPage';
        menu.enable(true);
    }

    ionViewDidEnter() {
        this.storage.get('hasLoggedIn').then(value => {
            if (value){
                this.storage.get('user').then(value2 => {
                    if(value2 !== null) {
                        this.userInfo = value2;
                        if(this.userInfo.first_name !== null && this.userInfo.last_name !== null) {
                            this.profileName = this.userInfo.first_name.charAt(0).toUpperCase() + this.userInfo.last_name.charAt(0).toUpperCase()
                        }
                    }
                })
            }
        })
    }

    getAllCategory(): void {
        this.showLoading();
        this.product.getAllCategory()
            .subscribe(value => {
                this.pages = value;
                this.presentToast('Category fetched');
            }, error2 => {
                this.showError(error2);
            })
    }

    ngOnInit(): void {
        this.getAllCategory();
    }

    openPage(p): void {
        // this.showLoading();
        this.nav.setRoot('CategoryPage', {pageInfo: p}).then(value => {
            this.presentToast(p.value)
        });
    }

    goToHome() {
        this.nav.setRoot('DashboardPage');
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

    goToProfile() {
        this.navCtrl.push('ProfilePage');
    }

    goToLoginRegister() {
        this.navCtrl.push('LoginPage');
    }
}
