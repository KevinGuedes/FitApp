import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' //Visible to all components in the app. With this, it is not necessary to add the service in providers array on app.module.ts
})
export class AuthService {

  public authChange: Subject<boolean> = new Subject<boolean>();
  private user: User | null = null;

  constructor(private router: Router) { }

  public registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };

    this.authSuccessfully();
  }

  public login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };

    this.authSuccessfully();
  }

  public logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  public getUser(): User | null {
    return this.user ? { ... this.user } : null; //return the user with a differente reference, so that the original user is not modified
  }

  public isAuthenticated(): boolean {
    return this.user != null;
  }

  private authSuccessfully(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
