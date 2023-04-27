import {ProductsState} from "./products-state.service";

export const filterProducts = (state: ProductsState): ProductsState => {
  return state.filter === undefined ? {...state} :
    {
      ...state,
      products: {
        ...state.products,
        domain: state.products.domain.filter(product => product.productType === state.filter)
      }
    }

}
