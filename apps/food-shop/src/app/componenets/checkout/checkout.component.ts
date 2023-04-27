import {Component, OnInit} from '@angular/core';
import {CartStateService} from "../../services/cart-state.service";
import {BehaviorSubject, combineLatest, map, Observable, Subject, take, withLatestFrom} from "rxjs";
import {Order, OrderPaymentSummaryExtraFee, ProductOrder} from "@livesession-food-workshop-angular/core/model";
import {InputRadioCardModel} from "@livesession-food-workshop-angular/shared/components/input-radio-card";
import {
  getCartPriceFeeModel,
  mapPaymentFeeFromCardData
} from "@livesession-food-workshop-angular/food-shop/cart/cart-util";
import {CheckoutStateService} from "../../services/checkout-state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'livesession-food-workshop-angular-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  constructor(private cartState: CartStateService, private checkoutService: CheckoutStateService, private router: Router) {
    this.checkoutService.checkIfTaxesChanged();
    this.checkoutData$ = combineLatest([
      this.checkoutService.checkoutSummary$,
      this.feeSubject
    ]).pipe(
      withLatestFrom(this.cartState.productsInCart$),
      map(([[checkoutSummary, paymentFee], productOrder]) => {
        return {
          cartProducts: productOrder,
          orderPaymentSummaryExtraFee: getCartPriceFeeModel(checkoutSummary, paymentFee)
        }
      })
    )
  }

  checkoutData$: Observable<{
    orderPaymentSummaryExtraFee: OrderPaymentSummaryExtraFee,
    cartProducts: Array<ProductOrder>
  }>

  cardData: Array<InputRadioCardModel> = [
    {name: "Card", description: "Card transaction fee", value: 0.00, valueDescription: "$0.00", selected: true},
    {name: "Cash", description: "Cash processing fee", value: 2.50, valueDescription: "$2.50", selected: false}
  ];

  private feeSubject: Subject<number> = new BehaviorSubject<number>(mapPaymentFeeFromCardData(this.cardData))

  ngOnInit(): void {
  }


  handleCreateOrder(order: Order) {
    this.checkoutService.createOrder(order).pipe(
      take(1)
    ).subscribe(() => {
      this.router.navigate(["/orders"]);
    });
  }


  handlePaymentMethodChange(cardData: InputRadioCardModel[]) {
    this.feeSubject.next(mapPaymentFeeFromCardData(cardData));
  }

  handleUpdateProductQuantity(productOrder: ProductOrder) {
    this.cartState.updateQuantity(productOrder);

  }

  handleRemoveProduct(productOrder: ProductOrder) {
    this.cartState.removeProductFromCart(productOrder);
  }
}
