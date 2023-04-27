import {Inject, Injectable} from "@angular/core";
import {CartStateService} from "./cart-state.service";
import {combineLatest, first, map, Subject, withLatestFrom} from "rxjs";
import {getCartPriceModel} from "@livesession-food-workshop-angular/food-shop/cart/cart-util";
import {Tax, TAX_TOKEN_OBS} from "@livesession-food-workshop-angular/core/model";
import {TaxApiService} from "@livesession-food-workshop-angular/core/services/api-service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable()
export class CheckoutStateService {

  constructor(
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


}
