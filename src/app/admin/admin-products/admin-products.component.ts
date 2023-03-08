import { Observable, map } from 'rxjs';
import { ProductService } from './../../servieces/product.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})

export class AdminProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'price', 'edit'];
  dataSource;
  filteredDataSource;
  products$: Observable<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().snapshotChanges();
    this.products$.pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    )
    this.products$.subscribe(res => {

      this.dataSource = new MatTableDataSource(
        res.map(product => {
          return {
            title: product.payload.val().title,
            edit: "true",
            price: product.payload.val().price,
            key: product.key
          }
        })
      )
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
    // this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.filteredDataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
