import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
