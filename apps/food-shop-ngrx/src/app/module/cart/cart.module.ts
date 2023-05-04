import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CheckoutPageComponent} from "./components/checkout-page/checkout-page.component";
import {MaterialModule} from "@livesession-food-workshop-angular/core/theme";
import {RouterModule} from "@angular/router";
import {CheckoutDetailsModule} from "@livesession-food-workshop-angular/food-shop/checkout/checkout-details";
import {DomPortalModule} from "@livesession-food-workshop-angular/shared/components/dom-portal";


@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CheckoutDetailsModule,
    DomPortalModule
  ],
  exports: [
    CheckoutPageComponent
  ],
})
export class CartModule {

}
