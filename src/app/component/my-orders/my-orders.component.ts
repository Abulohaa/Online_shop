import { Component } from '@angular/core';
import { AuthService } from 'app/servieces/auth.service';
import { OrderService } from 'app/servieces/order.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    this.orders$ = authService.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.orderService.getOrdersByUser(user.uid).valueChanges();
        } else {
          return of([]);
        }
      })
    );
  }
}
