import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private readonly _snackBar: MatSnackBar) { }

  public showSnackBar(message: string, action: string, duration: number): void {
    this._snackBar.open(message, action, {
      duration: duration * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }
}
