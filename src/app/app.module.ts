import { OrderService } from './servieces/order.service';
import { MaterialModule } from './../material/material/material.module';
import { ProductService } from './servieces/product.service';
import { CategoryService } from './servieces/category.service';
import { AdminAuthGuardService as AdminAuthGuard } from './servieces/admin-auth-guard.service';
import { UserService } from './servieces/user.service';
import { AuthGuardService as AuthGuard } from './servieces/auth-guard.service';
import { AuthService } from './servieces/auth.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductsComponent } from './component/products/products.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { OrderSuccessComponent } from './component/order-success/order-success.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './component/login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFilterComponent } from './component/products/product-filter/product-filter.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { ShoppingCartService } from './servieces/shopping-cart.service';
import { ProductQuantityComponent } from './component/product-quantity/product-quantity.component';
import { ShoppingDialogComponent } from './shared/shopping-dialog/shopping-dialog.component';
import { ShoppingCartSummaryComponent } from './component/check-out/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './component/check-out/shipping-form/shipping-form.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingCartComponent,
    NavbarComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingDialogComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    SignUpComponent,
    FooterComponent,
  ],
  entryComponents: [ShoppingDialogComponent],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: "",
        // component: HomeComponent,
        component: ProductsComponent,
      },
      {
        path: "products",
        component: ProductsComponent
      },
      {
        path: "shopping-cart",
        component: ShoppingCartComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "sign-up",
        component: SignUpComponent
      },
      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "order-success/:id",
        component: OrderSuccessComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "my/orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "admin/products/new",
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: "admin/products/:id",
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: "admin/products",
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      // {
      //   path: "**",
      //   component: HomeComponent
      // },
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebase
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
