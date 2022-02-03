import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'fit-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav: EventEmitter<void> = new EventEmitter<void>();

  public isAuthenticated: boolean = false;
  private authSubscription!: Subscription;

  constructor(private readonly _authService: AuthService) {
  }

  public onClose(): void {
    this.closeSidenav.emit();
  }

  public onLogout(): void {
    this._authService.logout();
    this.onClose();
  }

  ngOnInit(): void {
    this._authService.authChange.subscribe(authStatus => this.isAuthenticated = authStatus);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
