import {createReducer, on} from "@ngrx/store";
import {FavoriteState} from "./favorite-state.model";
import {addProductToFavorite, removeAllProductsFromFavorite, removeProductFromFavorite} from "./favorite.actions";


const initialFavoriteState: FavoriteState = {
  products: []
}

export const favoriteReducer = createReducer<FavoriteState>(initialFavoriteState,
  on(addProductToFavorite, (state, {product}) => {
    return {
      ...state,
      products: [...state.products, product],
    };
  }),
  on(removeProductFromFavorite, (state, {product}) => {
    return {
      ...state,
      products: [...state.products.filter((prod) => prod.id !== product.id)],
    };
  }),
  on(removeAllProductsFromFavorite, (state) => ({...state, products: []})))
