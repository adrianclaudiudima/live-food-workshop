import {ShopState} from "../module/shop/store/shop-state.module";
import {ActionReducerMap} from "@ngrx/store";
import {shopReducer} from "../module/shop/store/shop.reducer";
import {CartState} from "../module/cart/store/cart-state.model";
import {cartReducer} from "../module/cart/store/cart.reducer";
import {FavoriteState} from "../module/favorite/favorite-state.model";
import {favoriteReducer} from "../module/favorite/favorite.reducer";

export interface AppState {
  shopState: ShopState;
  favoriteState: FavoriteState,
  cartState: CartState
  /*cartState: any;
  favoriteState: any;*/
}

export const foodShopActionReducerMap: ActionReducerMap<AppState> = {
  shopState: shopReducer,
  cartState: cartReducer,
  favoriteState: favoriteReducer
}




