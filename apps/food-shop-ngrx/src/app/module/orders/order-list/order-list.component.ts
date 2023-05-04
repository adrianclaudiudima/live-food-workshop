import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {Order, RequestStatus} from "@livesession-food-workshop-angular/core/model";
import {Store} from "@ngrx/store";
import {OrdersState} from "../state/orders-state.model";
import {ActivatedRoute, Router} from "@angular/router";
import {loadOrders, setOrderDetails} from "../state/orders.actions";
import {getOrdersWithRequestStatus} from "../state/orders.selectors";


@Component({
  selector: 'app-order-list',
  templateUrl: 'order-list.component.html'
})
export class OrderListComponent {

  orders$: Observable<{
    requestStatus: RequestStatus,
    domain: Array<Order>
  }>


  constructor(private store: Store<OrdersState>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.store.dispatch(loadOrders());
    this.orders$ = this.store.select(getOrdersWithRequestStatus)

  }

  selectOrder(order: Order) {
    this.store.dispatch(setOrderDetails({order}))
    this.router.navigate([order.id], {relativeTo: this.activatedRoute})
  }

}
