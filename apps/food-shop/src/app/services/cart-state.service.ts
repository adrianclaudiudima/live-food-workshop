import {Injectable} from "@angular/core";
import {Product, ProductOrder} from "@livesession-food-workshop-angular/core/model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {StateSerializerService} from "@livesession-food-workshop-angular/core/services/api-service";


@Injectable()
export class CartStateService {

  private productsInCart: Array<ProductOrder> = [];
  private productsInCartSubject: Subject<Array<ProductOrder>> = new BehaviorSubject<Array<ProductOrder>>([]);
  public productsInCart$: Observable<Array<ProductOrder>> = this.productsInCartSubject.asObservable();


  constructor(private stateSerializerService: StateSerializerService) {
    const savedProducts = stateSerializerService.restoreState();
    if (savedProducts && savedProducts.cartProducts && savedProducts.cartProducts.length > 0) {
      // todo: add dependency to products service and maybe filter out products which are
      // todo: no longer available
      this.productsInCart = savedProducts.cartProducts;
      this.productsInCartSubject.next(this.productsInCart);
    }
  }

  public addMultipleProductsToCart(productOrders: Array<ProductOrder>) {
    productOrders.forEach(p => {
      this.addProductInCart(p);
    })
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart)
  }

  public addProductToCart(productOrder: ProductOrder) {
    this.addProductInCart(productOrder);
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart)
  }

  private addProductInCart(productOrder: ProductOrder) {
    if (this.productsInCart.find(v => v.product.id === productOrder.product.id)) {
      this.productsInCart = this.productsInCart.map(prod => {
        return {
          ...prod,
          quantity: prod.product.id === productOrder.product.id ? prod.quantity + productOrder.quantity : prod.quantity
        }
      })
    } else {
      this.productsInCart.push(productOrder)
    }
  }

  private pushSubjectAndStoreToLocalStorage(productsInCart: Array<ProductOrder>) {
    this.productsInCartSubject.next(productsInCart);
    this.stateSerializerService.saveCartProducts(productsInCart);
  }

  updateQuantity(payload: { product: Product; quantity: number }) {
    this.productsInCart = this.productsInCart.map(p => {
      return p.product.id === payload.product.id ? {
        ...p,
        quantity: payload.quantity
      } : p
    })
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart);
  }

  public removeProductFromCart(productOrder: ProductOrder) {
    this.productsInCart = this.productsInCart.filter(prod => prod.product.id !== productOrder.product.id);
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart);
  }

  removeAllProductsFromCart() {
    this.productsInCart = [];
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart);
  }

}
