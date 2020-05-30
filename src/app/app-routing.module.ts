import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { SellComponent } from './components/sell/sell.component';

import { 
  RoleGuardService as RoleGuard 
} from './auth/role-guard.service'


const routes: Routes = [
  
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'users', component: UsersComponent}
  ],canActivate:[RoleGuard],data:{expectedRole:'admin'}},

  {path: 'login', component: LoginComponent},
  {path: 'sell', component: SellComponent, canActivate:[RoleGuard],data:{expectedRole:'user' && 'admin'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
