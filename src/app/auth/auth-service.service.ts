import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root' //Visible to all components in the app. With this, it is not necessary to add the service in providers array on app.module.ts
})
export class AuthService {

  public authChange: Subject<boolean> = new Subject<boolean>();
  private _user: User | null = null;

  constructor(private readonly _router: Router, private readonly _firebaseAuth: Auth) { }

  public registerUser(authData: AuthData): void {
    this._user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };

    createUserWithEmailAndPassword(this._firebaseAuth, authData.email, authData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        this.authSuccessfully();
      })
      .catch(console.error);
  }

  public login(authData: AuthData): void {
    this._user = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };

    this.authSuccessfully();
  }

  public logout(): void {
    this._user = null;
    this.authChange.next(false);
    this._router.navigate(['/login']);
  }

  public getUser(): User | null {
    return this._user ? { ... this._user } : null; //return the user with a differente reference, so that the original user is not modified
  }

  public isAuthenticated(): boolean {
    return this._user != null;
  }

  private authSuccessfully(): void {
    this.authChange.next(true);
    this._router.navigate(['/training']);
  }
}
