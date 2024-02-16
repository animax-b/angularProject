import { environment } from "src/environments/environment";
import { CartItem } from "./cart-item";
import { CART_ID } from "../app.constant";

export class Cart {
    id: string;
    items: CartItem[];
    total: number;
    tax: number;
    taxRate: number;
    grandTotal: number;
    userId: number;
    createdDate?: string;

    constructor() {
        this.id = this.getCartId();
        this.userId = 0;
        this.items = [];
        this.total = 0;
        this.tax = 0;
        this.grandTotal = 0;
        this.taxRate = environment.taxRate;
    }
    getCartId() {
        let cartId = localStorage.getItem(CART_ID);
        if (cartId == null) {
            cartId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            localStorage.setItem(CART_ID, cartId);
        }
        return cartId;
    }
}
