import { ShoppingCartService } from './../../servieces/shopping-cart.service';
import { Component, Input } from '@angular/core';
import { Product } from 'app/models/product';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  // animations: [
  //   trigger("fade", [
  //     state('show', style({
  //       opacity: 1
  //     })),
  //     state('hide', style({
  //       opacity: 0.7
  //     })),
  //     transition('show => hide', animate('0.3s ease-out')),
  //     transition('hide => show', animate('0.5s ease-in'))
  //   ])
  // ]
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  // show = true;
  // get stateName() {
  //   return this.show ? 'show' : 'hide';
  // }
  // toggle() {
  //   this.show = (this.shoppingCart == 0) ? true : false;
  // }

  constructor(private cartService: ShoppingCartService) {

  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
