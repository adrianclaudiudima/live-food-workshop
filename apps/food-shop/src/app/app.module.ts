import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {IconRegistryModule, MaterialModule,} from '@livesession-food-workshop-angular/core/theme';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShopComponent} from './componenets/shop/shop.component';
import {AppRouting} from './app.routing';
import {DomPortalModule} from '@livesession-food-workshop-angular/shared/components/dom-portal';
import {CheckoutComponent} from './componenets/checkout/checkout.component';
import {
  FoodShopFavoriteFavoriteWidgetModule
} from "@livesession-food-workshop-angular/food-shop/favorite/favorite-widget";
import {FoodShopCartCartWidgetModule} from "@livesession-food-workshop-angular/food-shop/cart/cart-widget";
import {
  FoodShopCategoryCategorySummaryCardModule
} from "@livesession-food-workshop-angular/food-shop/category/category-summary-card";
import {FoodShopProductProductListModule} from "@livesession-food-workshop-angular/food-shop/product/product-list";
import {OverlayProductDetailsDialog} from "./componenets/product-details-overlay/product-details-overlay.component";
import {
  FoodShopProductProductDetailsModule
} from "@livesession-food-workshop-angular/food-shop/product/product-details";
import {ProductsStateService} from "./services/products-state.service";
import {ApiServiceModule} from "@livesession-food-workshop-angular/core/services/api-service";

@NgModule({
  declarations: [AppComponent, ShopComponent, CheckoutComponent, OverlayProductDetailsDialog],
  imports: [
    BrowserAnimationsModule,
    DomPortalModule,
    AppRouting,
    MaterialModule,
    HttpClientModule,
    IconRegistryModule,
    FoodShopFavoriteFavoriteWidgetModule,
    FoodShopCartCartWidgetModule,
    FoodShopCategoryCategorySummaryCardModule,
    FoodShopProductProductListModule,
    FoodShopProductProductDetailsModule,
    ApiServiceModule,
  ],
  providers: [
    ProductsStateService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
