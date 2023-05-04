import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {OrdersState} from "./orders-state.model";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {OrdersApiService} from "@livesession-food-workshop-angular/core/services/api-service";
import {loadOrderDetails, loadOrderDetailsFailed, loadOrderDetailsSuccess, loadOrders, loadOrdersFailed, loadOrdersSuccess} from "./orders.actions";
import {catchError, map, of, switchMap} from "rxjs";


@Injectable()
export class OrdersEffects {

  constructor(private store: Store<OrdersState>, private actions: Actions, private ordersApiService: OrdersApiService) {
  }

  loadOrderDetails$ = createEffect(() => this.actions.pipe(
    ofType(loadOrderDetails),
    switchMap(({orderId}) => this.ordersApiService.loadOrderById(orderId).pipe(
      map(order => loadOrderDetailsSuccess({order})),
      catchError(err => of(loadOrderDetailsFailed({error: 'Something went wrong'})))
    ))
  ))


  loadOrders$ = createEffect(() => this.actions.pipe(
    ofType(loadOrders),
    switchMap(_ => this.ordersApiService.loadOrders().pipe(
      map(orders => loadOrdersSuccess({orders})),
      catchError(err => of(loadOrdersFailed({err: 'Something went wrong...'})))
    ))
  ))

}
