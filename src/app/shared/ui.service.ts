import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly _snackBar: MatSnackBar) { }

  public showSnackBar(message: string, action: string, duration: number): void {
    this._snackBar.open(message, action, {
      duration: duration * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }
}
