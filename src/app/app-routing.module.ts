import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a la ruta de login
  { path: 'login', component: LoginComponent },           // Ruta de login
  { path: 'products', component: ProductComponent },      // Ruta de productos
  { path: 'category', component: CategoriesComponent },     // Ruta de categorías
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
