import {createReducer, on} from "@ngrx/store";
import {ShopState} from "./shop-state.module";
import {
  filterProductsAction,
  loadProductsAndCategories,
  loadProductsAndCategoriesFailed,
  loadProductsAndCategoriesSuccess
} from "./shop.actions";

const initialShopState: ShopState = {
  domain: {
    categories: [],
    products: []
  },
  requestStatus: {
    status: 'NEW'
  },
  filter: undefined,
  selectedFilterIndex: 0,
  ordersTotalCount: {
    domain: 0,
    requestStatus: {
      status: 'NEW'
    }
  }
}
export const shopReducer = createReducer<ShopState>(initialShopState,
  on(loadProductsAndCategories, (state) => {
    return {
      ...state,
      requestStatus: {
        status: 'PENDING'
      }
    }
  }),
  on(loadProductsAndCategoriesSuccess, (state, {categories, products}) => {
    return {
      ...state,
      requestStatus: {
        status: 'COMPLETED'
      },
      domain: {
        categories, products
      }
    }
  }),
  on(loadProductsAndCategoriesFailed, (state, {errorMessage}) => {
    return {
      ...state,
      requestStatus: {
        status: 'ERROR',
        error: {
          message: errorMessage
        }
      },
      domain: {
        categories: [],
        products: []
      }
    }
  }),
  on(filterProductsAction, (state, {productType}) => {
    return {
      ...state,
      filter: productType
    }
  })
)
