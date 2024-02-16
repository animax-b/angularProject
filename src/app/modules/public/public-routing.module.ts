import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullsizeLayoutComponent } from './shared/fullsize-layout/fullsize-layout.component';
import { HomeComponent } from './home/home.component';
import { PublicLayoutComponent } from './shared/public-layout/public-layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ReceiptComponent } from './receipt/receipt.component';

const routes: Routes = [
    {
        path: '', component: FullsizeLayoutComponent, children: [
            { path: '', component: HomeComponent }
        ]
    },
    {
        path: '', component: PublicLayoutComponent, children: [
            { path: 'cart', component: CartComponent },
            { path: 'payment', component: PaymentComponent },
            { path: 'receipt', component: ReceiptComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },            
            { path: 'unauthorize', component: UnauthorizeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule { }
