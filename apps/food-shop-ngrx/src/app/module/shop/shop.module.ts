import {NgModule} from '@angular/core';
import {ShopPageComponent} from './components/shop-page/shop-page.component';
import {DomPortalModule} from '@livesession-food-workshop-angular/shared/components/dom-portal';
import {FoodShopCategoryCategorySummaryCardModule} from '@livesession-food-workshop-angular/food-shop/category/category-summary-card';
import {FoodShopProductProductListModule} from '@livesession-food-workshop-angular/food-shop/product/product-list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ShopWidgetComponent} from './components/shop-widget/shop-widget.component';
import {FoodShopFavoriteFavoriteWidgetModule} from "@livesession-food-workshop-angular/food-shop/favorite/favorite-widget";
import {FoodShopCartCartWidgetModule} from "@livesession-food-workshop-angular/food-shop/cart/cart-widget";
import {FoodShopOrdersOrdersWidgetModule} from "@livesession-food-workshop-angular/food-shop/orders/orders-widget";
import {ProductDetailsOverlayComponent} from "./components/product-details-overlay/product-details-overlay.component";
import {FoodShopProductProductDetailsModule} from "@livesession-food-workshop-angular/food-shop/product/product-details";

@NgModule({
  declarations: [
    ShopPageComponent,
    ShopWidgetComponent,
    ProductDetailsOverlayComponent
  ],
  imports: [
    CommonModule,
    DomPortalModule,
    FoodShopCategoryCategorySummaryCardModule,
    FoodShopProductProductListModule,
    MatIconModule,
    MatButtonModule,
    FoodShopFavoriteFavoriteWidgetModule,
    FoodShopCartCartWidgetModule,
    FoodShopOrdersOrdersWidgetModule,
    FoodShopProductProductDetailsModule,
  ],
  exports: [ShopPageComponent,
    ShopWidgetComponent,
    ProductDetailsOverlayComponent],
})
export class ShopModule {
}
