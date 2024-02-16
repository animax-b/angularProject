import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CartItem } from '../models/cart-item';
import { UtilService } from './util.service';
import { CART_ID } from '../app.constant';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart;
  private httpHeaders: HttpHeaders;
  constructor(private utilService:UtilService, private httpClient:HttpClient) {
    this.cart = new Cart();
    this.httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
  }
  private calculateCart(): void {
    this.cart.total = 0;
    this.cart.items.forEach(x => {
      this.cart.total += x.unitPrice * x.quantity;
    });
    this.cart.tax = Math.round((this.cart.total * this.cart.taxRate) / 100);
    this.cart.grandTotal = this.cart.total + this.cart.tax;

    this.saveCart();
  }
  private saveCart(): void {
    const encData = this.utilService.Encrypt(this.cart);
    localStorage.setItem(this.cart.id, encData);
  }
  AddToCart(itemId: number, name: string, imageUrl: string, unitPrice: number, quantity: number): void {
    let item = this.cart.items.find(x => x.itemId == itemId);
    if (item == undefined) {
      item = new CartItem(itemId, name, imageUrl, unitPrice, quantity);
      this.cart.items.push(item);
    }
    this.calculateCart();
  }
  DeleteItem(itemId: number): void {
    let item = this.cart.items.find(x => x.itemId == itemId);
    if (item != undefined) {
      let index = this.cart.items.indexOf(item);
      this.cart.items.splice(index, 1);
    }
    this.calculateCart();
  }
  GetCart(): Cart {
    const encCart = localStorage.getItem(this.cart.id);
    if (encCart!=null) {
      this.cart = this.utilService.Decrypt(encCart);
    }
    return this.cart;
  }
  RemoveCart(): void {  
    localStorage.removeItem(this.cart.id);
    localStorage.removeItem(CART_ID);
  }
  SaveCartToDB(cart:Cart): Observable<HttpResponse<any>> {
    this.cart.userId = cart.userId;
    this.saveCart();
    return this.httpClient.post(`${environment.apiAddress}/cart/savecart`, JSON.stringify(cart), { headers: this.httpHeaders, observe: 'response' });
  }
}
