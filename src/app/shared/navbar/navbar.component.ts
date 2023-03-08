import { ShoppingCart } from './../../models/shopping-cart';
import { ShoppingCartService } from './../../servieces/shopping-cart.service';
import { AppUser } from './../../models/app-user';
import { AuthService } from '../../servieces/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  appUser: AngularFireObject<AppUser> | any;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser)
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
