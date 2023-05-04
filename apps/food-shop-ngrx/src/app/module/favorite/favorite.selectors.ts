import {AppState} from "../../store/app-state.module";
import {createSelector} from "@ngrx/store";
import {FavoriteState} from "./favorite-state.model";
import {Product} from "@livesession-food-workshop-angular/core/model";


const favoriteSelector = (appState: AppState) => appState.favoriteState;

export const getAllFavoriteProducts = createSelector<AppState, FavoriteState, Array<Product>>(favoriteSelector, s1 => {
  return s1.products;
})

export const isProductToFavorite = (productId: number | string) => createSelector<AppState, Array<Product>, boolean>(getAllFavoriteProducts, s1 => {
  return !!s1.find(prod => prod.id === productId)
});

export const getTotalProductsAtFavorite = createSelector<AppState, Array<Product>, number>(getAllFavoriteProducts, s1 => {
  return s1.length
});
