import {createAction, props} from "@ngrx/store";
import {Product, ProductOrder} from "@livesession-food-workshop-angular/core/model";

export const addProductToCartAction = createAction('[CART] Add product to cart', props<{ productOrder: ProductOrder }>())
export const addProductsToCartAction = createAction('[CART] Add products to cart', props<{ productOrders: ProductOrder[] }>())

export const removeProductFromCart = createAction('[CART] Remove product from cart', props<{ product: Product }>())
export const removeAllProductsFromCart = createAction('[CART] Remove all products from cart')
export const updateProductQuantity = createAction('[CART] Update product quantity', props<{ productOrder: ProductOrder }>())
export const moveProductsToCartFromFavoriteAction = createAction('[CART] Move products from favoriteToCart', props<{ productOrders: ProductOrder[] }>())
