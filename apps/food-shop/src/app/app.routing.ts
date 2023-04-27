import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShopComponent} from "./componenets/shop/shop.component";
import {CheckoutComponent} from "./componenets/checkout/checkout.component";
import {YourOrderDetailsComponent} from "./componenets/your-order-details/your-order-details.component";
import {YourOrdersComponent} from "./componenets/your-orders/your-orders.component";


const appRoutes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'orders',
    component: YourOrdersComponent
  },
  {
    path: 'orders/:id',
    component: YourOrderDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),],
  exports: [RouterModule]
})
export class AppRouting {

}
