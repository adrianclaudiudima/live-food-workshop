import {createAction, props} from "@ngrx/store";
import {Product} from "@livesession-food-workshop-angular/core/model";


export const addProductToFavorite = createAction('[FAVORITE] Add product to favorite', props<{ product: Product }>())
export const removeProductFromFavorite = createAction('[FAVORITE] Remove products from favorite', props<{ product: Product }>())
export const removeAllProductsFromFavorite = createAction('[FAVORITE] Remove all products from favorite')
