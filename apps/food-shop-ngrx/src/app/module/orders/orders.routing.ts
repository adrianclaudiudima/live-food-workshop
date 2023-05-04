import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";


const ordersRoutes: Routes = [
  {
    path: '',
    component: OrderListComponent
  }, {
    path: ':id',
    component: OrderDetailsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(ordersRoutes)],
  exports: [RouterModule]
})
export class OrdersRouting {

}
