import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestComponent } from './components/test/test.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { TopComponent } from './components/shared/top/top.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './components/products/products.component';
import { SellComponent } from './components/sell/sell.component';

import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { TopSellComponent } from './components/shared/top-sell/top-sell.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TestComponent,
    SidebarComponent,
    TopComponent,
    HomeComponent,
    UsersComponent,
    ProductsComponent,
    SellComponent,
    TopSellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
