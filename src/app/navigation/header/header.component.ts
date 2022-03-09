import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from './../../auth/auth-service.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../state/app/app.reducer';
import * as fromAuthSelectors from './../../state/auth/auth.selectors';

@Component({
  selector: 'fit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter<void>();

  public isAuthenticated$!: Observable<boolean>;

  constructor(
    private readonly _authService: AuthService,
    private readonly _store: Store<fromRoot.AppState>
  ) { }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {
    this._authService.logout();
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this._store.select(fromAuthSelectors.selectIsAuthenticated);
  }
}
