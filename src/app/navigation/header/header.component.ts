import { AuthService } from './../../auth/auth-service.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'fit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter<void>();

  public isAuthenticated: boolean = false;
  private authSubscription!: Subscription;

  constructor(private readonly authService: AuthService) { }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => this.isAuthenticated = authStatus);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
