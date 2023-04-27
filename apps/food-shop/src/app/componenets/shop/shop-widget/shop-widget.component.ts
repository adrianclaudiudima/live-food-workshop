import {Component} from "@angular/core";
import {FavoriteStateService} from "../../../services/favorite-state.service";
import {Product, ProductOrder} from "@livesession-food-workshop-angular/core/model";
import {CartStateService} from "../../../services/cart-state.service";
import {map, Observable} from "rxjs";
import {getProductsInCartWithTotalQuantity} from "./shop-widget.utils";

@Component({
  selector: 'app-shop-widget',
  templateUrl: 'shop-widget.component.html'
})
export class ShopWidgetComponent {

  favoriteProducts$: Observable<Product[]>;
  cartProducts$: Observable<{
    products: ProductOrder[],
    totalQuantity: number
  }>

  constructor(private favoriteStateService: FavoriteStateService, private cartStateService: CartStateService) {
    this.favoriteProducts$ = this.favoriteStateService.favoriteProducts$;
    this.cartProducts$ = this.cartStateService.productsInCart$.pipe(
      map(products => getProductsInCartWithTotalQuantity(products))
    );
  }

  removeProductFromFavorite(product: Product) {
    this.favoriteStateService.updateFavoriteState({product, favorite: false})
  }

  addAllProductsToCart(products: Product[]) {
    this.favoriteStateService.removeAll()
  }

  addProductToCart(productOrder: ProductOrder) {
    this.cartStateService.addProductToCart(productOrder);
    this.favoriteStateService.removeProduct(productOrder.product)
  }

  updateQuantity(payload: { product: Product; quantity: number }) {
    this.cartStateService.updateQuantity(payload)
  }

  removeProductFromCart(productOrder: ProductOrder) {
    this.cartStateService.removeProductFromCart(productOrder);
  }
}
