import {createAction, createActionGroup, emptyProps, props} from "@ngrx/store";
import {CategorySummary, Product, ProductType} from "@livesession-food-workshop-angular/core/model";

export const loadProductsAndCategories = createAction('[SHOP] Load products and categories action')
export const loadProductsAndCategoriesSuccess = createAction('[SHOP] Load products and categories success action', props<{
  categories: CategorySummary[],
  products: Product[]
}>())
export const loadProductsAndCategoriesFailed = createAction('[SHOP] Load products and categories failed action', props<{
  errorMessage: string
}>())

export const filterProductsAction = createAction('[SHOP] Filter products', props<{
  productType: ProductType | undefined
}>())


export const ShopActions = createActionGroup({
  source: 'Shop',
  events: {
    'Load Products And Categories': emptyProps(),
    'Load Products And Categories Success': props<{ products: Array<Product>; categories: Array<CategorySummary> }>(),
    'Load Products And Categories Failed': props<{ errorMessage: string }>(),
    'Filter Products': props<{ productType: ProductType | undefined }>(),
    'Count orders': emptyProps(),
    'Count orders success': props<{ totalOrders: number }>(),
    'Count orders failed': props<{ errorMessage: string }>(),
  },
});
