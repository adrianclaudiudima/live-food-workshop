import {Component, inject, OnInit} from '@angular/core';
import {DomainEntity, Product, ProductOrder} from "@livesession-food-workshop-angular/core/model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app-state.module";
import {Router} from "@angular/router";
import {getAllProductsInCartWithTotalQuantity} from "../../../cart/store/cart.selectors";
import {addProductToCartAction, moveProductsToCartFromFavoriteAction, removeProductFromCart, updateProductQuantity} from "../../../cart/store/cart.actions";
import {getAllFavoriteProducts} from "../../../favorite/favorite.selectors";

@Component({
  selector: 'app-shop-widgets',
  templateUrl: './shop-widget.component.html',
  styleUrls: ['./shop-widget.component.scss'],
})
export class ShopWidgetComponent implements OnInit {

  private _store: Store<AppState> = inject(Store<AppState>)
  private _router: Router = inject(Router);

  cartTitle = 'Shopping cart updated'

  cartState$!: Observable<{ productOrders: ProductOrder[]; totalQuantity: number }>;
  favoriteProducts$!: Observable<Array<Product>>;
  orders$!: Observable<DomainEntity<number>>;

  constructor() {
    this.cartState$ = this._store.select(getAllProductsInCartWithTotalQuantity)
    this.favoriteProducts$ = this._store.select(getAllFavoriteProducts)
  }

  ngOnInit(): void {
  }

  handleOrdersClicked() {

  }

  handleAddAllProductsToCart(favoriteProducts: Array<Product>) {
    this._store.dispatch(moveProductsToCartFromFavoriteAction({productOrders: favoriteProducts.map(product => ({product, quantity: 1}))}));
    // this._store.dispatch(removeAllProductsFromFavorite());
    // this._store.dispatch(addProductsToCartAction({productOrders: favoriteProducts.map(product => ({product, quantity: 1}))}))
  }

  handleRemoveProductFromFavorite(product: Product) {
  }

  handleAddProductToCart({product, quantity}: ProductOrder) {
    this._store.dispatch(addProductToCartAction({productOrder: {product, quantity}}))

  }

  handleUpdateProductQuantity({product, quantity}: { product: Product; quantity: number }) {
    this._store.dispatch(updateProductQuantity({productOrder: {product, quantity}}))

  }

  handleRemoveProductFromCart({product}: ProductOrder) {
    this._store.dispatch(removeProductFromCart({product}))

  }
}

