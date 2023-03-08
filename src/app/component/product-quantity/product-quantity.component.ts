import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Product } from 'app/models/product';
import { ShoppingCartService } from 'app/servieces/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  pageLink;

  // show = true;
  // get stateName() {
  //   return this.show ? 'show' : 'hide';
  // }
  // toggle() {
  //   this.show = (this.shoppingCart == 0) ? true : false;
  // }

  constructor(private cartService: ShoppingCartService, router: ActivatedRoute) {
    this.pageLink = router.snapshot.url.join('/');
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
