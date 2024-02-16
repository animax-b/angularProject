import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RECEIPT_ID } from 'src/app/app.constant';
import { Cart } from 'src/app/models/cart';
import { Payment } from 'src/app/models/payment';
import { razorpayOrder } from 'src/app/models/razorpay-order';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

declare const Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styles: [
  ]
})
export class PaymentComponent implements OnInit {
  cart: Cart | any;
  user: User | any;
  RAZORPAY_OPTIONS = {
    "key": "",
    "amount": "",
    "currency": "",
    "name": "",
    "description": "",
    "image": "/assets/images/logo.png",
    "order_id": "",
    "handler": (res: any) => {
      //console.log(res);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": "NA"
    },
    "theme": {
      "color": "#4285F4"
    }
  };
  constructor(private cartService: CartService, private router: Router, private zone: NgZone, private paymentService: PaymentService, private authService: AuthService, private utilService: UtilService) {
    this.cart = this.cartService.GetCart();
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    const order = new razorpayOrder(this.cart.grandTotal, 'INR', 'NA');
    this.paymentService.CreateOrder(order).subscribe((response) => {
      if (response.status === 200) {
        this.RAZORPAY_OPTIONS.order_id = response.body.orderId;
      }
    });
  }
  PaywithRazorPay() {
    if (this.user != undefined) {
      this.RAZORPAY_OPTIONS.name = this.user.name;
      this.RAZORPAY_OPTIONS.key = environment.razorpayKey;
      this.RAZORPAY_OPTIONS.amount = this.cart.grandTotal;
      this.RAZORPAY_OPTIONS.currency = 'INR';

      let items = "";
      for (let i = 0; i < this.cart.items.length; i++) {
        items += this.cart.items[i].name;
      }
      this.RAZORPAY_OPTIONS.description = items;

      this.RAZORPAY_OPTIONS.prefill.name = this.user.name;
      this.RAZORPAY_OPTIONS.prefill.email = this.user.email;
      this.RAZORPAY_OPTIONS.prefill.contact = this.user.phoneNumber;

      this.RAZORPAY_OPTIONS.handler = this.razorPaySuccessHander.bind(this);

      const razorPay = new Razorpay(this.RAZORPAY_OPTIONS);
      razorPay.open();
    }
  }
  razorPaySuccessHander(res: any) {
    const payment = new Payment();

    payment.cartId = this.cart.id;
    payment.items = this.cart.items;
    payment.total = this.cart.total;
    payment.tax = this.cart.tax;
    payment.grandTotal = this.cart.grandTotal;

    payment.signature = res.razorpay_signature;
    payment.orderId = res.razorpay_order_id;
    payment.paymentId = res.razorpay_payment_id;

    payment.currency = this.RAZORPAY_OPTIONS.currency;
    payment.email = this.user.email;
    payment.userId = this.user.id;

    //console.log(payment);
    this.paymentService.SavePayementDetails(payment).subscribe(res => {
      if (res.status == 200) {
        this.cartService.RemoveCart();
        localStorage.setItem(RECEIPT_ID, this.utilService.Encrypt(res.body));
        this.zone.run(() => this.router.navigate(['/receipt']));
      }
    })
  }
}
