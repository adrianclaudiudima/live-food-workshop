import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Order} from "@livesession-food-workshop-angular/core/model";
import {OrdersApiService} from "@livesession-food-workshop-angular/core/services/api-service";

@Component({
  selector: 'app-your-orders-component',
  templateUrl: 'your-orders.component.html',
})
export class YourOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrdersApiService, private router: Router) {
    this.orders$ = this.orderService.loadOrders();
  }

  selectOrder(order: Order) {
    this.router.navigate(['orders', order.id]);
  }
}
