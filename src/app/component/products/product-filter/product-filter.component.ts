import { CategoryService } from './../../../servieces/category.service';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories$: Observable<any>;

  @Input('category') category;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll().valueChanges();
  }
}
