import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {
  cart: Cart;
  user: User | undefined;
  constructor(private cartSevice: CartService, private authService: AuthService, private router: Router) {
    this.cart = this.cartSevice.GetCart();
    this.user = this.authService.user;
  }

  ngOnInit(): void {
  }
  removeItem(id: any) {
    if (confirm('Are you sure to remove this item?')) {
      this.cartSevice.DeleteItem(id);
      this.cart = this.cartSevice.GetCart();
    }
  }
  checkOut() {
    if (this.user != undefined) {
      this.cart.userId = this.user.id;
      this.router.navigate(['/payment']);
      this.cartSevice.SaveCartToDB(this.cart).subscribe((response) => {
        if (response.status == 200) {
          this.router.navigate(['/payment']);
        }
      });
    }
    else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/cart' } });
    }
  }
}
