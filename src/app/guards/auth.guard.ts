import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('token') !== null; 

  if (!isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }

  return true;
};
