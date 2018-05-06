import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Cart} from "../../package/cart/spareCart";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-product',
    templateUrl: 'product.html',
    animations: [
        trigger('cartBadge', [
            state('idle', style({
                opacity: '1',
                transform: 'scale(1)'
            })),
            state('adding', style({
                opacity: '1',
                transform: 'scale(1.3)'
            })),
            transition('idle <=> adding', animate('300ms linear')),
            transition('void => *', [
                style({transform: 'translateX(200%)'}),
                animate('300ms ease-in-out')
            ])
        ]),
        trigger('addButton', [
            state('idle', style({
                opacity: '1'
            })),
            state('adding', style({
                opacity: '1',
                fontWeight: 'bold'
            })),
            transition('idle <=> adding', animate('300ms linear')),
            transition('void => *', [
                style({transform: 'translateX(200%)'}),
                animate('300ms ease-in-out')
            ])
        ])
    ]
})
export class ProductPage implements OnInit {
    itemsInCart: Object[] = [];
    cartBadgeState: string = 'idle';
    public itemsCountInCart: number;
    public productName: string;
    productSlideOption = {
        pager: true
    };
    public productInfo: any;
    @ViewChild(Slides) slides: Slides;
    public itemCountInCart: number;

    constructor(public navCtrl: NavController, public navParams: NavParams, private changeDetector: ChangeDetectorRef, private cart: Cart) {

    }

    ngOnInit(): void {
        this.productInfo = this.navParams.get('productInfo');
        this.productName = this.productInfo.product_name;
        this.itemCount(this.productInfo.id);
        console.log('ionViewDidLoad ProductPage');
    }

    ionViewDidLoad() {
        this.updateCart();
        this.productInfo = this.navParams.get('productInfo');
        this.itemCount(this.productInfo.id);
    }

    ionViewDidEnter() {
        this.updateCart();
        this.productInfo = this.navParams.get('productInfo');
        this.itemCount(this.productInfo.id);
    }

    public slideChanged() {
        event.preventDefault();
        let currentIndex = this.slides.getActiveIndex();
        console.log(this.slides._isBeginning);
        console.log(this.slides._isEnd);
        console.log('Current index is', currentIndex);
    }

    public updateCart() {
        this.cart.getAllItemsCount().then(value => {
            if (value) {
                this.itemsCountInCart = value;
            }
        })
    }

    public itemCount(itemId) {
        this.cart.getItemCount(itemId).then(value2 => {
            if(value2) {
                this.itemCountInCart = value2;
                this.productInfo.quantity = value2;
            }
        })
    }

    /*goToSlide(index) {
        this.slides.slideTo(2, 500);
    }*/
    public prevSlide(activeIndex: number) {
        if (!this.slides._isBeginning) {
            this.slides.slideTo(activeIndex - 1, 500);
            console.log(activeIndex)
        }
    }

    public nextSlide(activeIndex: number) {
        if (!this.slides._isEnd) {
            this.slides.slideTo(activeIndex + 1, 500);
        }
        console.log(activeIndex)
    }

   public addToCart(item) {
        item.quantity += 1;
        if (!isNaN(parseFloat(item.price))) {
            item.totalPrice = item.quantity * parseFloat(item.price);
        } else {
            item.totalPrice = '';
            item.price = '';
        }
        item.addButtonState = 'adding';
        this.cartBadgeState = 'adding';
        this.changeDetector.detectChanges();
        this.cart.addItem(item).then(value => {
            if (value) {
                this.updateCart();
                this.itemCount(item.id);
            }
        });
    }

    addToCartFinished(item) {
        this.cartBadgeState = 'idle';
        item.addButtonState = 'idle';
    }

    public goToCartView() {
        this.navCtrl.push('CartViewPage')
    }
}
