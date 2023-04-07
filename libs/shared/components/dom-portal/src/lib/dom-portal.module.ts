import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomPortalComponent} from "./dom-portal.component";
import {PortalModule} from "@angular/cdk/portal";

@NgModule({
  declarations: [
    DomPortalComponent
  ],
  imports: [
    CommonModule,
    PortalModule
  ],
  exports: [DomPortalComponent]
})
export class DomPortalModule {
}
