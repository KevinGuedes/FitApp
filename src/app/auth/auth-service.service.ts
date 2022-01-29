import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authChange: Subject<boolean> = new Subject<boolean>();
  private user: User | null = null;

  constructor() { }

  public registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };

    this.authChange.next(true);
  }

  public login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };

    this.authChange.next(true);
  }

  public logout(): void {
    this.user = null;
    this.authChange.next(false);
  }

  public getUser(): User | null {
    return this.user ? { ... this.user } : null; //return the user with a differente reference, so that the original user is not modified
  }

  public isAuthenticated(): boolean {
    return this.user != null;
  }
}
