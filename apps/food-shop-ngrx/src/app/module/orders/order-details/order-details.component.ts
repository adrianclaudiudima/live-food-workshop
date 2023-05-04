import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {OrdersState} from "../state/orders-state.model";
import {Store} from "@ngrx/store";
import {first, map, Observable, switchMap, tap} from "rxjs";
import {getSelectedOrder, isOrderDetailsLoaded} from "../state/orders.selectors";
import {loadOrderDetails} from "../state/orders.actions";
import {DomainEntity, emitOnlyIfCompleted, Order} from "@livesession-food-workshop-angular/core/model";


@Component({
  selector: 'app-order-details-page',
  templateUrl: 'order-details.component.html'
})
export class OrderDetailsComponent {


  order$: Observable<DomainEntity<Order | undefined>>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store: Store<OrdersState>) {
    this.order$ = this.activatedRoute.paramMap.pipe(
      map(paramMap => {
        const orderId = paramMap.get('id');
        if (!orderId) {
          this.router.navigate(['/orders'])
        }
        return orderId as string;
      }),
      switchMap(orderId => {
        return this.store.select(isOrderDetailsLoaded(orderId)).pipe(
          first(),
          tap(isOrderDetailsLoaded => {
            if (!isOrderDetailsLoaded) {
              this.store.dispatch(loadOrderDetails({orderId}))
            }
          }),
          switchMap(_ => this.store.select(getSelectedOrder)
            .pipe(emitOnlyIfCompleted))
        )
      }),
    )
  }


}
