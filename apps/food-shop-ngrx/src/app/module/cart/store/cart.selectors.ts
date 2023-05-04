import {AppState} from "../../../store/app-state.module";
import {createSelector} from "@ngrx/store";
import {getCartPriceModel} from "@livesession-food-workshop-angular/food-shop/cart/cart-util";
import {Tax} from "@livesession-food-workshop-angular/core/model";


const selectCartState = (appState: AppState) => appState.cartState;

export const getAllProductsInCart = createSelector(selectCartState, s1 => {
  return s1.products
})

export const getAllProductsInCartWithTotalQuantity = createSelector(getAllProductsInCart, s1 => {
  return {
    productOrders: s1,
    totalQuantity: s1.length === 0 ? 0 : s1.map(productOrder => productOrder.quantity).reduce((a, b) => a + b)
  }
})


export const getCheckoutSummary = (tax: Tax) => createSelector(getAllProductsInCart, s1 => {
  return {
    orderPaymentSummaryExtraFee: getCartPriceModel(s1, tax.vatRatePercentage, tax.serviceChargePercentage),
    cartProducts: s1
  }

})

