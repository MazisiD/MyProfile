import { Injectable, signal } from '@angular/core';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase';

/**
 * Wraps Firebase Authentication (email/password) for the admin login area.
 * `isLoggedIn` / `currentUser` reflect the live auth state and can be read
 * from templates or the auth guard.
 */
@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly currentUser = signal<User | null>(null);
  readonly isLoggedIn = signal(false);
  readonly authReady = signal(false);

  constructor() {
    if (!isFirebaseConfigured) {
      // No real Firebase project configured yet (e.g. during unit tests or
      // before the site owner has set up Firebase) — mark auth as "ready"
      // with no user so the auth guard doesn't hang waiting for a state
      // change that will never arrive.
      this.authReady.set(true);
      return;
    }

    onAuthStateChanged(auth, user => {
      this.currentUser.set(user);
      this.isLoggedIn.set(!!user);
      this.authReady.set(true);
    });
  }

  login(email: string, password: string): Promise<unknown> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(auth);
  }
}
