import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  cart: Cart | undefined;
  user:User | undefined;
  constructor(private cartService: CartService, private authService: AuthService, private router:Router) {
    this.cart = this.cartService.GetCart();
    this.user = this.authService.user;
  }

  ngOnInit(): void {
  }
  LogOut(): void{
    this.authService.RemoveUser();
    this.router.navigate(['/login']);
  }
}
