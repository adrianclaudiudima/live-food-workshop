import {Component, EventEmitter, Injector, Input, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef,} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {MatButton} from '@angular/material/button';
import {TemplatePortal} from '@angular/cdk/portal';
import {Subject, take, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {Product, ProductOrder} from "@livesession-food-workshop-angular/core/model";
import {CART_OVERLAY_REF_TOKEN, CART_TITLE_TOKEN} from "../../token/cart.token";

@Component({
  selector: 'app-cart-widget',
  templateUrl: 'cart-widget.component.html',
})
export class CartWidgetComponent implements OnDestroy {

  @Input()
  title = '';

  @Input()
  cartProducts: Array<ProductOrder> = [];

  @Input()
  cartQuantity: number = 0;

  @Output()
  removeProductFromCart: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();

  @Output()
  updateProductQuantity: EventEmitter<{ product: Product; quantity: number }> =
    new EventEmitter<{ product: Product; quantity: number }>();
  @ViewChild('cartButton')
  cartButton!: MatButton;
  overlayRef: OverlayRef | undefined;
  @ViewChild('cartList') templatePortalContent!: TemplateRef<any>;
  private disposeObservables: Subject<any> = new Subject();

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private injector: Injector
  ) {
  }

  showCartDetails(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.cartButton._elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 40,
          },
        ]),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '350px',
      maxHeight: '500px',
      hasBackdrop: true,
      disposeOnNavigation: true,
    });

    const customInjectorContext: Injector = Injector.create({
      providers: [
        {
          provide: CART_TITLE_TOKEN,
          useValue: this.title
        },
        {
          provide: CART_OVERLAY_REF_TOKEN,
          useValue: this.overlayRef
        }],
      parent: this.injector
    })

    this.overlayRef.attach(
      new TemplatePortal(this.templatePortalContent, this.viewContainerRef, null, customInjectorContext)
    );
    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.disposeObservables), take(1))
      .subscribe((_) => {
        this.overlayRef?.detach();
        this.overlayRef = undefined;
      });
  }

  ngOnDestroy(): void {
    this.disposeObservables.next('');
  }

  navigateToProductsPage() {
    this.router.navigate([]);
    this.overlayRef?.dispose();
  }

  handleRemoveProduct(productOrder: ProductOrder) {
    this.removeProductFromCart.emit(productOrder);
  }

  handleUpdateQuantity(payload: { product: Product; quantity: number }) {
    this.updateProductQuantity.emit(payload);
  }

  navigateToCheckoutPage() {
    this.overlayRef?.dispose();
    this.router.navigate(['checkout']);
  }
}
