import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root' //Visible to all components in the app. With this, it is not necessary to add the service in providers array on app.module.ts
})
export class AuthService {

  public authChange: Subject<boolean> = new Subject<boolean>();
  private _isAuthenticated: boolean = false;

  constructor(
    private readonly _router: Router,
    private readonly _firebaseAuth: Auth,
    private readonly _trainingService: TrainingService,
    private readonly _zone: NgZone,
    private readonly _snackBar: MatSnackBar,
    private readonly _uiService: UiService,
  ) { }

  public initAuthListener(): void {
    onAuthStateChanged(this._firebaseAuth, (user: User | null) => {
      if (Boolean(user)) {
        this._isAuthenticated = true;
        this.authChange.next(true);
        this._zone.run(() => {
          this._router.navigate(['/training']);
        });
      } else {
        this._trainingService.cancelSubscriptions();
        this._isAuthenticated = false;
        this.authChange.next(false);
        this._zone.run(() => {
          this._router.navigate(['/login']);
        });
      }
    })
  }

  public registerUser(authData: AuthData): void {
    this._uiService.loadingStateChanged.next(true);

    createUserWithEmailAndPassword(this._firebaseAuth, authData.email, authData.password)
      .then((_) => {
        this._uiService.loadingStateChanged.next(false);
      })
      .catch((error: any) => {
        this._uiService.loadingStateChanged.next(false);
        this.authErrorHandler(error)
      });
  }

  public login(authData: AuthData): void {
    this._uiService.loadingStateChanged.next(true);

    //* Login and Create User actions adds the user token and other info in the session storage
    //* The data is send on the request to firestore and that why we can access the database, even with the auth rules configured on the firebase project 
    signInWithEmailAndPassword(this._firebaseAuth, authData.email, authData.password)
      .then((_) => {
        this._uiService.loadingStateChanged.next(false);
      })
      .catch((error: any) => {
        this._uiService.loadingStateChanged.next(false);
        this.authErrorHandler(error)
      });
  }

  public logout(): void {
    signOut(this._firebaseAuth);
    //this._firebaseAuth.signOut();
  }

  public isAuthenticated(): boolean {
    return this._isAuthenticated; //doesn't solve the problem, everyone can send a boolean
  }

  private authErrorHandler(error: any): void {
    this._snackBar.open(error.message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }
}
