import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {foodShopActionReducerMap} from './store/app-state.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ApiServiceModule, TaxApiService} from '@livesession-food-workshop-angular/core/services/api-service';
import {IconRegistryModule} from '@livesession-food-workshop-angular/core/theme';
import {AppRouting} from './app.routing';
import {ShopModule} from "./module/shop/shop.module";
import {EffectsModule} from "@ngrx/effects";
import {ShopEffects} from "./module/shop/store/shop.effects";
import {metaReducers} from "./store/storage.metareducer";
import {ReactiveFormsModule} from "@angular/forms";
import {CartModule} from "./module/cart/cart.module";
import {Tax, TAX_TOKEN} from "@livesession-food-workshop-angular/core/model";
import {Observable} from "rxjs";
import {environment} from "../../../food-shop/src/environments/environment";
import {CartEffects} from "./module/cart/store/cart.effects";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    ApiServiceModule,

    IconRegistryModule,
    ReactiveFormsModule,
    StoreModule.forRoot(foodShopActionReducerMap, {
      metaReducers: metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictStateSerializability: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([ShopEffects, CartEffects]),
    ShopModule,
    CartModule,
    AppRouting,

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [TaxApiService],
      useFactory: initializeAppFactory,
      multi: true
    },
    {
      provide: TAX_TOKEN,
      deps: [TaxApiService],
      useFactory: (taxApiService: TaxApiService) => {
        console.log(taxApiService.tax)
        return taxApiService.tax;
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
