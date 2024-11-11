import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) { // Verifica se o usuário está autenticado
    return true; // Permite o acesso
  }

  router.navigate(['/login']); // Redireciona se o usuário não estiver autenticado
  return false; // Bloqueia o acesso
};