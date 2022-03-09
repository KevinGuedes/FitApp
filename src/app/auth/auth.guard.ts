import { AuthService } from 'src/app/auth/auth-service.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import * as fromRoot from './../state/app/app.reducer';
import * as fromAuthSelectors from './../state/auth/auth.selectors';

@Injectable({
    providedIn: 'root' //Is treated as a service and with this line is provided for the entire app
    //if not in root. It has to be provided where it will be used (see app-routing.module.ts)
})
//guard only runs once
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private readonly _store: Store<fromRoot.AppState>
    ) { }

    canLoad(
        route: Route,
        segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this._store.select(fromAuthSelectors.selectIsAuthenticated);
        // if (this._authService.isAuthenticated()) return true
        // else return this._router.navigate(['/login']);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this._store.select(fromAuthSelectors.selectIsAuthenticated);
        // if (this._authService.isAuthenticated()) return true
        // else return this._router.navigate(['/login']);
    }
}
