import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";


@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: []
})
export class IconRegistryModule {

  constructor(private _matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this._matIconRegistry.addSvgIcon("user-chef", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/user-chef-light.svg"));
    this._matIconRegistry.addSvgIcon("chart-line-light", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/chart-line-light.svg"));
    this._matIconRegistry.addSvgIcon("chart-pie-light", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/chart-pie-light.svg"));
    this._matIconRegistry.addSvgIcon("chart-mixed-light", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/chart-mixed-light.svg"));
    this._matIconRegistry.addSvgIcon("chart-simple-horizontal-light", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/chart-simple-horizontal-light.svg"));
    this._matIconRegistry.addSvgIcon("burger-soda-light", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/burger-soda-light.svg"));
    this._matIconRegistry.addSvgIcon("minus-solid", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/minus-solid.svg"));
    this._matIconRegistry.addSvgIcon("plus-solid", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/plus-solid.svg"));
    this._matIconRegistry.addSvgIcon("star-solid", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/star-solid.svg"));
    this._matIconRegistry.addSvgIcon("star-half-duotone", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/star-half-duotone.svg"));
    this._matIconRegistry.addSvgIcon("heart-light", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/heart-light.svg"));
    this._matIconRegistry.addSvgIcon("heart-solid", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/heart-solid.svg"));
    this._matIconRegistry.addSvgIcon("close", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/xmark-solid.svg"));
    this._matIconRegistry.addSvgIcon("basket", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/basket-shopping-simple-solid.svg"));
    this._matIconRegistry.addSvgIcon("trash-light", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/trash-light.svg"));
    this._matIconRegistry.addSvgIcon("cart-circle-plus-light", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/cart-circle-plus-light.svg"));
    this._matIconRegistry.addSvgIcon("arrow-left-solid", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/arrow-left-solid.svg"));
    this._matIconRegistry.addSvgIcon("menu", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/bars-solid.svg"));
    this._matIconRegistry.addSvgIcon("memo-circle-info-light", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/memo-circle-info-light.svg"));
    this._matIconRegistry.addSvgIcon("memo-circle-info-solid", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/memo-circle-info-solid.svg"));

  }

}
