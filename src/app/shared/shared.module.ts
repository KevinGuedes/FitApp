import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";

@NgModule({
    declarations: [], //if we have shared components in the other modules
    imports: [
        CommonModule, //provides ngIf and so on
        FormsModule,
        MaterialModule, //Wont be imported twice (here and in AppModule) because Angular does the module management for us
        FlexLayoutModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
    ]
})
export class SharedModule { }
