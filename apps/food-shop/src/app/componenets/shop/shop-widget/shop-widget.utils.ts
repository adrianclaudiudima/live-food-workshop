import {ProductOrder} from "@livesession-food-workshop-angular/core/model";


export const getProductsInCartWithTotalQuantity = (productsInCart: ProductOrder[]): {
  products: ProductOrder[],
  totalQuantity: number
} => {

  return {
    products: productsInCart,
    totalQuantity: productsInCart.length === 0 ? 0 :
      productsInCart.map(prod => prod.quantity)
        .reduce((a, b) => a + b)
  }
}
