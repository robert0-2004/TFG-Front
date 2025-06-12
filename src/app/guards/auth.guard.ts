import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (state.url === '/users/create') {
    return true;
  }

  if (!userService.isAuthenticated()) {
    router.navigate(['/login']); // Redirige solo si NO está autenticado
    return false;
  }

  return true; // Permite acceso si está autenticado
};