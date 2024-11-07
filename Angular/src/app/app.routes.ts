import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SidebarComponent} from "./page-elements/sidebar/sidebar.component";
import {HeaderComponent} from "./page-elements/header/header.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./guard/auth.guard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'sidebar', component: SidebarComponent },
  { path: 'header', component: HeaderComponent }
];
