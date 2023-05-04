import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShopPageComponent} from "./module/shop/components/shop-page/shop-page.component";
import {CheckoutPageComponent} from "./module/cart/components/checkout-page/checkout-page.component";


const routes: Routes = [
  {
    path: '',
    component: ShopPageComponent
  }, {
    path: 'checkout',
    component: CheckoutPageComponent
  }, {
    path: 'orders',
    loadChildren: () => import('./module/orders/orders.module').then(m => m.OrdersModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRouting {

}
