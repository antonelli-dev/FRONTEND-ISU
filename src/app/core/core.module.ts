import { NgModule } from "@angular/core";
import { MaterialModule } from "./modules/material.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        MaterialModule,
        HttpClientModule
    ],
    exports: [
        MaterialModule,
        HttpClientModule
    ]
})
export class CoreModule {}