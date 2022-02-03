import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'fit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _title: string = 'FitApp';
  private _madeBy: string = 'Kevin Guedes';

  // @ViewChild('sidenav') sidenav: any;
  // public toggleSidenav(): void {
  //   this.sidenav.toggle();
  //  }
}
