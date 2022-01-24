import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
    //* Exports the material modules imported previously to make them available outside this module
})
export class MaterialModule { }
