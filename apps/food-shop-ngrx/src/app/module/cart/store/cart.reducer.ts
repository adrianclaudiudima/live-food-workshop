import {createReducer, on} from "@ngrx/store";
import {CartState} from "./cart-state.model";
import {addProductsToCartAction, addProductToCartAction, moveProductsToCartFromFavoriteAction, removeAllProductsFromCart, removeProductFromCart, updateProductQuantity} from "./cart.actions";
import {updateProductOrderQuantity} from "./cart-util";
import {ProductOrder} from "@livesession-food-workshop-angular/core/model";

const initialCartState: CartState = {
  products: []
}

export const cartReducer = createReducer<CartState>(initialCartState,
  on(addProductToCartAction, (state, {productOrder}) => {
    return {...state, products: updateProductOrderQuantity([...state.products], productOrder)};
  }),
  on(addProductsToCartAction, moveProductsToCartFromFavoriteAction, (state, {productOrders}) => {
    let allProductOrders: Array<ProductOrder> = [...state.products];
    productOrders.forEach((po) => {
      allProductOrders = updateProductOrderQuantity(allProductOrders, po);
    });
    return {...state, products: allProductOrders};
  }),
  on(removeProductFromCart, (state, {product}) => ({
    ...state,
    products: state.products.filter((po) => po.product.id !== product.id),
  })),
  on(removeAllProductsFromCart, (state) => ({...state, products: []})),
  on(updateProductQuantity, (state, {productOrder}) => ({
    ...state,
    products: state.products.map((prod) =>
      prod.product.id === productOrder.product.id ? {...prod, quantity: productOrder.quantity} : {...prod}
    ),
  })),
)
