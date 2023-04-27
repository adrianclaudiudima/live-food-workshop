import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, Observable, switchMap, tap} from 'rxjs';
import {Order} from "@livesession-food-workshop-angular/core/model";
import {OrdersApiService} from "@livesession-food-workshop-angular/core/services/api-service";

@Component({
  selector: 'app-your-order-details',
  templateUrl: 'your-order-details.component.html',
})
export class YourOrderDetailsComponent {
  order$: Observable<Order>;

  constructor(
    private router: Router,
    private activatedRute: ActivatedRoute,
    private ordersApiService: OrdersApiService
  ) {
    this.order$ = this.activatedRute.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      tap((id) => {
        if (!id) {
          this.router.navigate(['/orders']);
        }
      }),
      filter((id) => !!id),
      switchMap((orderId) => ordersApiService.loadOrderById(orderId as string))
    );
  }
}
