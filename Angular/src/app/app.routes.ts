import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SidebarComponent} from "./page-elements/sidebar/sidebar.component";
import {HeaderComponent} from "./page-elements/header/header.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./guard/auth.guard";
import {adminGuard} from "./guard/admin.guard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [adminGuard]},
  { path: 'sidebar', component: SidebarComponent },
  { path: 'header', component: HeaderComponent }
];
