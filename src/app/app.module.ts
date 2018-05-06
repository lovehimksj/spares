import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AllProductsPageModule} from "../pages/all-products/all-products.module";
import {DashboardPageModule} from "../pages/dashboard/dashboard.module";
import {ProductPage} from "../pages/product/product";
import {ProductPageModule} from "../pages/product/product.module";
import {HomeModule} from "../pages/home/home.module";
import {ProductService} from "../package/service/product";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpRequestHandler} from "../package/http/httpRequestHandler";
import {CategoryPage} from "../pages/category/category";
import {CategoryPageModule} from "../pages/category/category.module";
import {Cart} from "../package/cart/spareCart";
import {IonicStorageModule} from "@ionic/storage";
import {CartViewPageModule} from "../pages/cart-view/cart-view.module";
import {UserProvider} from "../package/provider/userProvider";
import {LoginPageModule} from "../pages/login/login.module";
import {RegisterPageModule} from "../pages/register/register.module";
import {UserService} from "../package/service/user";
import {CheckoutPageModule} from "../pages/checkout/checkout.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {OrdersPageModule} from "../pages/orders/orders.module";

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DashboardPageModule,
        ProductPageModule,
        AllProductsPageModule,
        HomeModule,
        HttpClientModule,
        CategoryPageModule,
        CartViewPageModule,
        LoginPageModule,
        RegisterPageModule,
        CheckoutPageModule,
        ProfilePageModule,
        OrdersPageModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        HttpRequestHandler,
        SplashScreen,
        ProductService,
        Storage,
        Cart,
        UserProvider,
        UserService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
