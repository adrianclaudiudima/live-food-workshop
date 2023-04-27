import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
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
import {ApiServiceModule, TaxApiService} from "@livesession-food-workshop-angular/core/services/api-service";
import {ShopWidgetComponent} from "./componenets/shop/shop-widget/shop-widget.component";
import {FavoriteStateService} from "./services/favorite-state.service";
import {CartStateService} from "./services/cart-state.service";
import {CheckoutDetailsModule} from "@livesession-food-workshop-angular/food-shop/checkout/checkout-details";
import {CheckoutStateService} from "./services/checkout-state.service";
import {Tax, TAX_TOKEN, TAX_TOKEN_OBS} from "@livesession-food-workshop-angular/core/model";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    ShopWidgetComponent,
    ShopComponent,
    CheckoutComponent,
    OverlayProductDetailsDialog],
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
    CheckoutDetailsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [TaxApiService],
      useFactory: initializeAppFactory,
      multi: true
    },

    ProductsStateService,
    FavoriteStateService,
    CartStateService,
    CheckoutStateService,
    {
      provide: TAX_TOKEN,
      deps: [TaxApiService],
      useFactory: (taxApiService: TaxApiService) => {
        return taxApiService.tax;
      }
    },
    {
      provide: TAX_TOKEN_OBS,
      deps: [TaxApiService],
      useFactory: (taxApiService: TaxApiService) => {
        return new BehaviorSubject<Tax>(taxApiService.tax)
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}


function initializeAppFactory(taxApiService: TaxApiService): () => Observable<Tax> {
  return () => taxApiService.loadTaxDetails({
    sc: environment.serviceChargePercentage,
    vt: environment.vatRatePercentage
  })
}
