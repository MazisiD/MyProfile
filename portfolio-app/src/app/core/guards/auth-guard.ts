import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { Auth } from '../services/auth';

/**
 * Protects /kayi-kayi/** routes. Waits for Firebase's initial auth-state check to
 * finish (authReady) before deciding, then redirects to the login page if the
 * user isn't signed in.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return toObservable(auth.authReady).pipe(
    filter(ready => ready),
    take(1),
    map(() => (auth.isLoggedIn() ? true : router.createUrlTree(['/kayi-kayi/login'])))
  );
};
