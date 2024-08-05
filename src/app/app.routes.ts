import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { PasswordComponent } from './password/password.component';
import { NewPasswordComponent } from './newpassword/newpassword.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user-home',component: UserHomeComponent},
  { path: 'password-req', component: PasswordComponent },
  { path: 'reset-password', component: NewPasswordComponent },
  { path: 'cart', component: ShoppingCartComponent },
  // { path: 'catalogo-usuarios', component: CatalogoUsuariosComponent, canActivate: [AdminGuard] },
  // { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  // { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];




// , canActivate: [AuthGuard]
