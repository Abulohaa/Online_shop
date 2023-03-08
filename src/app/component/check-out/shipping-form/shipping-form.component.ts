import { ShoppingCart } from './../../../models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'app/models/order';
import { AuthService } from 'app/servieces/auth.service';
import { OrderService } from 'app/servieces/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order);
    console.log(result);
    this.router.navigate(['/order-success', result.key]);
  }
}
