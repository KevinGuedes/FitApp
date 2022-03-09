import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../state/app/app.reducer';
import * as fromUiActions from './../state/ui/ui.actions';
import * as fromAuthActions from './../state/auth/auth.actions';

@Injectable({
  providedIn: 'root' //Visible to all components in the app. With this, it is not necessary to add the service in providers array on app.module.ts
})
export class AuthService {

  public authChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly _router: Router,
    private readonly _firebaseAuth: Auth,
    private readonly _trainingService: TrainingService,
    private readonly _zone: NgZone,
    private readonly _uiService: UiService,
    private readonly _store: Store<fromRoot.AppState> //AppState merges the feature States with itself
  ) { }

  public initAuthListener(): void {
    onAuthStateChanged(this._firebaseAuth, (user: User | null) => {
      if (Boolean(user)) {
        this._store.dispatch(fromAuthActions.setAuthtenticated());
        this._zone.run(() => {
          this._router.navigate(['/training']);
        });
      } else {
        this._trainingService.cancelSubscriptions();
        this._store.dispatch(fromAuthActions.setUnauthenticated());
        this._zone.run(() => {
          this._router.navigate(['/login']);
        });
      }
    })
  }

  public registerUser(authData: AuthData): void {
    this._store.dispatch(fromUiActions.startLoading());

    createUserWithEmailAndPassword(this._firebaseAuth, authData.email, authData.password)
      .then((_) => {
        this._store.dispatch(fromUiActions.stopLoading());
      })
      .catch((error: any) => {
        this._store.dispatch(fromUiActions.stopLoading());
        this.authErrorHandler(error)
      });
  }

  public login(authData: AuthData): void {
    this._store.dispatch(fromUiActions.startLoading());

    //* Login and Create User actions adds the user token and other info in the session storage
    //* The data is send on the request to firestore and thats why we can access the database, even with the auth rules configured on the firebase project 
    signInWithEmailAndPassword(this._firebaseAuth, authData.email, authData.password)
      .then((_) => {
        this._store.dispatch(fromUiActions.stopLoading());
      })
      .catch((error: any) => {
        this._store.dispatch(fromUiActions.stopLoading());
        this.authErrorHandler(error)
      });
  }

  public logout(): void {
    signOut(this._firebaseAuth);
    //this._firebaseAuth.signOut();
  }

  private authErrorHandler(error: any): void {
    this._uiService.showSnackBar(error.message, 'Dismiss', 3);
  }
}
