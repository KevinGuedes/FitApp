import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'fit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  ngOnInit(): void {
  }
}
