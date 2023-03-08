import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../servieces/product.service';
import { CategoryService } from './../../servieces/category.service';
import { Component } from '@angular/core';
import { forbiddenNameValidator, forbiddenNumberValidator, urlValidator } from 'app/shared/validator/form.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

interface Product {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$;
  // forbiddenName = /test$/;
  form: FormGroup;
  product: Product = {
    title: "",
    price: 0,
    category: "",
    imageUrl: "",
  };
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      // title: ['', [Validators.required, Validators.pattern(this.forbiddenName)]],
      title: ['', Validators.required],
      price: ['', [Validators.required, forbiddenNumberValidator()]],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required, urlValidator()]]
    });
    this.categories$ = categoryService.getAll().valueChanges();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).snapshotChanges()
      .pipe(take(1)).subscribe(product => {
        product.forEach(p => {
          switch (p.key) {
            case "title": this.product.title = p.payload.val() as string; break;
            case "price": this.product.price = p.payload.val() as number; break;
            case "category": this.product.category = p.payload.val() as string; break;
            case "imageUrl": this.product.imageUrl = p.payload.val() as string; break;
            default: break;
          }
        });
      });
  }


  save(product) {
    if (this.id)
      this.productService.update(this.id, product);
    else
      this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete() {
    debugger
    if (!confirm("Are you sure you want to delete this product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products'])
  }
}
