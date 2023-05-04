import {CategorySummary, DomainEntity, Product, ProductType} from "@livesession-food-workshop-angular/core/model";

export interface ShopState extends DomainEntity<{ categories: Array<CategorySummary>; products: Array<Product> }> {
  filter: ProductType | undefined;
  selectedFilterIndex: number;
  ordersTotalCount: DomainEntity<number>;
}


