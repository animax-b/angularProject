import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CartService } from 'src/app/services/cart.service';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  courses:Course[] | undefined;
  constructor(private catalogService:CatalogService, private cartService:CartService) { }

  ngOnInit(): void {
    this.catalogService.GetAll().subscribe(res=>{
      if(res.status==200 && res.body!=null)
        this.courses=res.body;
    });
  }
  AddToCart(itemId:number, name:string, imageUrl:string, unitPrice:number, quantity:number):void{
    this.cartService.AddToCart(itemId, name, imageUrl, unitPrice, quantity);
  }
}
