import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartViewPage } from './cart-view';

@NgModule({
  declarations: [
    CartViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CartViewPage),
  ],
})
export class CartViewPageModule {}
