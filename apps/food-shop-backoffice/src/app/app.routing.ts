import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./componenets/dashboard/dashboard.component";
import {OrdersComponent} from "./componenets/orders/orders.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'orders',
    component: OrdersComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    useHash: true
  })],
  exports: [
    RouterModule
  ]
})
export class AppRouting {

}
