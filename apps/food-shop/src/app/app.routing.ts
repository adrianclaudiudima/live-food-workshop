import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShopComponent} from "./componenets/shop/shop.component";
import {CheckoutComponent} from "./componenets/checkout/checkout.component";


const appRoutes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),],
  exports: [RouterModule]
})
export class AppRouting {

}
