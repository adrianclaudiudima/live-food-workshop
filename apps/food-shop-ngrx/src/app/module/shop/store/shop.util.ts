import {ShopState} from "./shop-state.module";
import {CategorySummary} from "@livesession-food-workshop-angular/core/model";


export const filterProductsBasedOnCategoryType = (shopState: ShopState): ShopState => {
  if (shopState.filter === undefined) {
    return {
      ...shopState,
      selectedFilterIndex: 0
    }
  } else {
    const filterCategorySummary: CategorySummary | undefined = shopState.domain.categories.find(
      (cat) => cat.type === shopState.filter
    );
    return {
      ...shopState,
      domain: {
        ...shopState.domain,
        products: shopState.domain.products.filter(p => p.productType === shopState.filter),
      },
      selectedFilterIndex: filterCategorySummary !== undefined ? shopState.domain.categories.indexOf(filterCategorySummary) + 1 : 0,
    }
  }
}
