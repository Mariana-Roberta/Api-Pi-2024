import {CanActivateFn, Router} from '@angular/router';
import { AuthService } from '../service/auth.service';
import {inject} from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  if (authService.getAuthStatus()) {
    if (roles.includes('ROLE_ADMIN')) {
      return true;
    } else {
      alert("Você não tem permissão")
      router.navigate(['/login']);
      return false;
    }
  } else {
    console.log('Você não esta autenticado');
    router.navigate(['/login']);
    return false;
  }
};