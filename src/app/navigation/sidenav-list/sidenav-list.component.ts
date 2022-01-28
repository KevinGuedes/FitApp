import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fit-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output()
  closeSidenav: EventEmitter<void>;

  constructor() {
    this.closeSidenav = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  public onClose(): void {
    this.closeSidenav.emit();
  }

}
