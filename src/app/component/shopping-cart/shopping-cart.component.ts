import { ShoppingDialogComponent } from './../../shared/shopping-dialog/shopping-dialog.component';
import { ShoppingCartService } from './../../servieces/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { ShoppingCart } from 'app/models/shopping-cart';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart$: Observable<ShoppingCart> = of(null);
  displayedColumns: string[] = ['product', 'quantity', 'price'];
  dataSource;
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getCart();
    this.subscription = this.cart$.subscribe(res => {
      this.cart = res;
      // console.log(this.cart);
    })
  }

  clearCart() {
    let dialogRef = this.dialog.open(ShoppingDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      (result == "true") ? this.shoppingCartService.clearCart() : null;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
