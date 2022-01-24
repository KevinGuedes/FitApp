import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule], //* Exports the material modules imported previously to make them available outside this module
})
export class MaterialModule { }
