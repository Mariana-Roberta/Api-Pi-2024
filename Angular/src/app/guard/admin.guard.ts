import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) { // Verifica se o usuário é admin
    return true; // Permite o acesso
  }

  router.navigate(['/not-authorized']); // Redireciona se não for admin
  return false; // Bloqueia o acesso
};
