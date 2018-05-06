import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Product} from "../model/product.model";

@Injectable()

export class Cart {
    inputValue: any;
    private cart: Product[] = [];
    private cartItems: Array<any> = [];

    constructor(private storage: Storage) {
    }

    public async getItemsFromCart(): Promise<string> {
        return this.storage.get('cartItems').then((value) => {
            return value;
        });
    }

    public async getAllItemsCount(): Promise<number> {
        return this.storage.get('cartItems').then((value) => {
            if (value != null) {
                return value.length;
            }
        });
    }

    public async getItemCount(itemId): Promise<number> {
        return this.storage.get('cartItems').then((value) => {
            if (value != null) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].hasOwnProperty('id') && value[i]['id'] === itemId) {
                        return value[i]['quantity'];
                    }
                }
            }
        });
    }

    public async increaseItemInCart(item): Promise<any> {
        for (let i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].hasOwnProperty('id') && this.cartItems[i]['id'] === item.id) {
                this.cartItems.splice(i, 1);
            }
        }
        let newVal = this.cartItems;
        newVal.push(item);
        return this.storage.set('cartItems', newVal).then(cartItem => {
            return cartItem
        })
    }

    public decreaseItemInCart(item): Promise<string> {
        for (let i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].hasOwnProperty('id') && this.cartItems[i]['id'] === item.id) {
                this.cartItems.splice(i, 1);
            }
        }
        let newVal = this.cartItems;
        if(item.quantity > 0) {
            newVal.push(item);
        }
        return this.storage.set('cartItems', newVal).then(cartItem => {
            return cartItem
        })

    }

    public async removeItemFromCart(item): Promise<string> {
        for (let i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].hasOwnProperty('id') && this.cartItems[i]['id'] === item.id) {
                this.cartItems.splice(i, 1);
            }
        }
        let newVal = this.cartItems;
        return this.storage.set('cartItems', newVal).then(cartItem => {
            return cartItem
        })
    }

    public async emptyCart(): Promise<boolean> {
        return this.storage.remove('cartItems').then(value => {
            console.log(value);
            this.cartItems = [];
            return true;
        });
    }

    public addItem(item): Promise<string> {
        this.storage.get('cartItems').then(value => {
            if (value != null) {
                this.cartItems = value;
            } else {
                this.cartItems = [];
            }
        });
        this.inputValue = [item];
        // if (this.cartItems != null) {
        if (!this.hasKeySetTo(this.cartItems, 'id', item.id)) {
            let theVal = this.cartItems;
            theVal.push(this.inputValue[0]);
            return this.storage.set('cartItems', theVal).then(value => {
                return value
            })
        } else {
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].hasOwnProperty('id') && this.cartItems[i]['id'] === item.id) {
                    this.cartItems.splice(i, 1);
                }
            }
            let newVal = this.cartItems;
            newVal.push(this.inputValue[0]);
            return this.storage.set('cartItems', newVal).then(value => {
                return value
            })
        }
        // } else {
        //     let newVal = this.inputValue;
        //     this.storage.set('cartItems', newVal);
        //     return value;
        // }
    }

    private hasKeySetTo(obj, key, value) {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].hasOwnProperty(key) && obj[i][key] === value) {
                return true;
            }
        }
    };
}
