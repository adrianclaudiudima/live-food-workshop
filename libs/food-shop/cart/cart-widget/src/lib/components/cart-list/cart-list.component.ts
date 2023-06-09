import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {Product, ProductOrder} from "@livesession-food-workshop-angular/core/model";
import {CART_OVERLAY_REF_TOKEN, CART_TITLE_TOKEN} from "../../token/cart.token";
import {OverlayRef} from "@angular/cdk/overlay";

@Component({
  selector: 'app-cart-list',
  templateUrl: 'cart-list.component.html',
})
export class CartListComponent {

  constructor(
    @Inject(CART_TITLE_TOKEN) public cartTitle: string,
    @Inject(CART_OVERLAY_REF_TOKEN) public overlayRef: OverlayRef) {
  }

  @Input()
  products: Array<ProductOrder> = [];

  @Output()
  navigateToProducts: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  navigateToCheckout: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removeProductFromCart: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();

  @Output()
  updateProductQuantity: EventEmitter<{ product: Product; quantity: number }> =
    new EventEmitter<{ product: Product; quantity: number }>();

  onAddProducts() {
    this.navigateToProducts.emit(true);
  }

  removeProduct(productOrder: ProductOrder): void {
    this.removeProductFromCart.emit(productOrder);
  }

  updateQuantity(product: Product, quantity: number) {
    if (quantity > 0) {
      this.updateProductQuantity.emit({product, quantity});
    }
  }

  onNavigateToCheckout() {
    this.navigateToCheckout.emit(true);
  }

  disposeOverlay() {
    this.overlayRef.dispose();
  }
}
