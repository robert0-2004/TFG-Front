import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuardGuard: CanActivateFn = (route, state): boolean => {

  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.isAdmin()) {
    router.navigate(['/admin']); // Redirige solo si NO está autenticado
    return false;
  }

  return true;
};
