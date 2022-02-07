import { AuthService } from 'src/app/auth/auth-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'fit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _title: string = 'FitApp';
  private _madeBy: string = 'Kevin Guedes';

  constructor(private readonly _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.initAuthListener();
  }

  // @ViewChild('sidenav') sidenav: any;
  // public toggleSidenav(): void {
  //   this.sidenav.toggle();
  //  }
}
