import {Component, Inject, inject} from "@angular/core";
import {InputRadioCardModel} from "@livesession-food-workshop-angular/shared/components/input-radio-card";
import {BehaviorSubject, combineLatest, map, Observable, Subject} from "rxjs";
import {getCartPriceFeeModel, mapPaymentFeeFromCardData} from "@livesession-food-workshop-angular/food-shop/cart/cart-util";
import {Order, OrderPaymentSummaryExtraFee, ProductOrder, Tax, TAX_TOKEN} from "@livesession-food-workshop-angular/core/model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app-state.module";
import {Router} from "@angular/router";
import {getCheckoutSummary} from "../../store/cart.selectors";

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout-page.component.html'
})
export class CheckoutPageComponent {

  cardData: Array<InputRadioCardModel> = [
    {name: 'Card', description: 'Card transaction fee', value: 0.0, valueDescription: '$0.00', selected: true},
    {name: 'Cash', description: 'Cash processing fee', value: 2.5, valueDescription: '$2.50', selected: false},
  ];

  private feeChanged: Subject<number> = new BehaviorSubject(mapPaymentFeeFromCardData(this.cardData));

  private _store: Store<AppState> = inject(Store<AppState>);
  private _router: Router = inject(Router);

  checkoutData$: Observable<{
    orderPaymentSummaryExtraFee: OrderPaymentSummaryExtraFee;
    cartProducts: Array<ProductOrder>;
  }>;

  constructor(@Inject(TAX_TOKEN) private tax: Tax) {
    this.checkoutData$ = combineLatest([
      this._store.select(getCheckoutSummary(tax)),
      this.feeChanged.asObservable()
    ]).pipe(
      map(([checkoutSummary, fee]) => {
        return {
          cartProducts: checkoutSummary.cartProducts,
          orderPaymentSummaryExtraFee: getCartPriceFeeModel(checkoutSummary.orderPaymentSummaryExtraFee, fee)
        }

      })
    )
  }

  handleCreateOrder(order: Order) {

  }

  handlePaymentMethodChange(models: InputRadioCardModel[]) {
    this.feeChanged.next(mapPaymentFeeFromCardData(models))
  }

  handleUpdateProductQuantity($event: ProductOrder) {

  }

  handleRemoveProduct($event: ProductOrder) {

  }

}
