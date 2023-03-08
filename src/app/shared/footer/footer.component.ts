import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from 'app/servieces/shopping-cart.service';
import { ShoppingCart } from 'app/models/shopping-cart';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) { }
  cart$: Observable<ShoppingCart>;
  shoppingCartService: ShoppingCartService;
  subscription: Subscription;
  cart: ShoppingCart;

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getCart();
    debugger

    this.subscription = this.cart$.subscribe(res => {
      debugger
      this.cart = res;
      // console.log(this.cart);
    })
  }
  setPosition(): boolean {
    return (this.router.url.includes("shopping-cart") || this.router.url.includes("my/orders")) && this.cart.totalItemsCount == 0;
    // && this.cart$.totalItemsCount == 0);
  }
}
