import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getAuthStatus()) { // Verifica se o usuário está autenticado
    return true;
  } else {
    alert("Sem permissão")
    router.navigate(['/login']);
    return false;
  }
};
