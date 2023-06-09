import {Inject, Injectable} from "@angular/core";
import {CartStateService} from "./cart-state.service";
import {combineLatest, first, map, Subject, tap, withLatestFrom} from "rxjs";
import {getCartPriceModel} from "@livesession-food-workshop-angular/food-shop/cart/cart-util";
import {Order, Tax, TAX_TOKEN_OBS} from "@livesession-food-workshop-angular/core/model";
import {
  OrdersApiService,
  StateSerializerService,
  TaxApiService
} from "@livesession-food-workshop-angular/core/services/api-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as uuid from "uuid";

@Injectable()
export class CheckoutStateService {

  constructor(
    private ordersApiService: OrdersApiService,
    private stateSerializer: StateSerializerService,
    private cartState: CartStateService,
    private taxApiService: TaxApiService,
    private matSnackbar: MatSnackBar,
    @Inject(TAX_TOKEN_OBS) private taxObs$: Subject<Tax>,
  ) {
  }

  public checkoutSummary$ = combineLatest([
    this.cartState.productsInCart$,
    this.taxObs$
  ]).pipe(
    map(([productInCarts, tax]) => {
      return getCartPriceModel(productInCarts, tax.vatRatePercentage, tax.serviceChargePercentage)
    })
  )

  public checkIfTaxesChanged() {
    this.taxApiService.refresh().pipe(
      withLatestFrom(this.taxObs$),
      map(([taxUpdated, currentTax]) => {
        if (taxUpdated.vatRatePercentage !== currentTax.vatRatePercentage || taxUpdated.serviceChargePercentage !== currentTax.serviceChargePercentage) {
          this.matSnackbar.open('Taxes changed...', 'ok', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          })
          this.taxObs$.next(taxUpdated);
        }
      }),
      first()
    ).subscribe()
  }


  createOrder(order: Order) {
    return this.ordersApiService.createOrder({
      ...order,
      id: uuid.v4().substring(0, 8).toUpperCase(),
      userId: this.stateSerializer.getUserState()?.id
    }).pipe(
      tap((_) => this.cartState.removeAllProductsFromCart())
    );
  }


}
