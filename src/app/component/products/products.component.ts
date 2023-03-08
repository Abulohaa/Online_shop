import { ShoppingCart } from 'app/models/shopping-cart';
import { ShoppingCartService } from './../../servieces/shopping-cart.service';
import { Product } from './../../models/product';
import { switchMap, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../servieces/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
  ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart()
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().snapshotChanges().pipe(
      switchMap((products: any) => {
        this.products = products.map((product) => ({ key: product.payload.key, ...product.payload.val() }));
        // debugger;

        return this.route.queryParamMap;
      })
    ).subscribe((params: any) => {

      this.category = params.get('category');
      this.applyFilter()
    });

  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => this.category.split(" ")[0].toLowerCase() == p.category.toLowerCase()) :
      this.products;
  }
}
