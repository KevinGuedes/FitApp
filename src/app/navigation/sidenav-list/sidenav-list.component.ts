import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth-service.service';
import * as fromRoot from './../../state/app/app.reducer';
import * as fromAuthSelectors from './../../state/auth/auth.selectors';

@Component({
  selector: 'fit-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav: EventEmitter<void> = new EventEmitter<void>();

  public isAuthenticated$!: Observable<boolean>;

  constructor(
    private readonly _authService: AuthService,
    private readonly _store: Store<fromRoot.AppState>
  ) { }

  public onClose(): void {
    this.closeSidenav.emit();
  }

  public onLogout(): void {
    this._authService.logout();
    this.onClose();
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this._store.select(fromAuthSelectors.selectIsAuthenticated);
  }
}
