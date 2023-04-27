import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

import * as moment from 'moment';
import {
  Order,
  OrderPaymentSummaryExtraFee,
  OrderStatus,
  Product,
  ProductOrder
} from "@livesession-food-workshop-angular/core/model";
import {InputRadioCardModel} from "@livesession-food-workshop-angular/shared/components/input-radio-card";
import {buildCheckoutForm} from "@livesession-food-workshop-angular/food-shop/cart/cart-util";

@Component({
  selector: 'app-checkout-details',
  templateUrl: 'checkout-details.component.html',
})
export class CheckoutDetailsComponent {
  checkoutFormGroup: FormGroup;
  @Input()
  cartProducts: Array<ProductOrder> = [];
  @Input()
  orderPaymentSummaryExtraFee!: OrderPaymentSummaryExtraFee;
  @Input()
  paymentMethodCards: InputRadioCardModel[] = [];
  @Input()
  paymentMethodTitle: string = '';

  @Output()
  updateProductQuantity: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();
  @Output()
  removeProduct: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();
  @Output()
  createOrder: EventEmitter<Order> = new EventEmitter<Order>();
  @Output()
  paymentMethodChanged: EventEmitter<InputRadioCardModel[]> = new EventEmitter<InputRadioCardModel[]>();

  constructor() {
    this.checkoutFormGroup = buildCheckoutForm();
  }

  updateQuantity(product: Product, quantity: number) {
    if (quantity > 0) {
      this.updateProductQuantity.emit({product, quantity});
    }
  }

  submitOrder() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    } else {
      const customerInfo = this.checkoutFormGroup.value;
      this.createOrder.emit({
        orderedProducts: this.cartProducts,
        name: customerInfo.name,
        comment: customerInfo.comment,
        table: customerInfo.table,
        orderPaymentSummaryExtraFee: this.orderPaymentSummaryExtraFee,
        // workaround since we don't have a real backend
        orderStatus: OrderStatus.ORDER_NEW,
        orderDateUnix: moment().unix(),
      });
    }
  }

  handlePaymentMethodChange(paymentMethodsCard: InputRadioCardModel[]) {
    this.paymentMethodCards = paymentMethodsCard;
    this.paymentMethodChanged.emit(paymentMethodsCard);
  }
}
