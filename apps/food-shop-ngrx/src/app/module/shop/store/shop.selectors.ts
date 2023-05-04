import {AppState} from "../../../store/app-state.module";
import {createSelector} from "@ngrx/store";
import {filterProductsBasedOnCategoryType} from "./shop.util";

const shopState = (appState: AppState) => appState.shopState;
export const getProductAndCategories = createSelector(shopState, s1 => s1)
export const getShopStateWithProductsFiltered = createSelector(getProductAndCategories, s1 => filterProductsBasedOnCategoryType(s1))

