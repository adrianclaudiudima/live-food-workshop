import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrderListComponent} from "./order-list/order-list.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {OrdersRouting} from "./orders.routing";
import {MaterialModule} from "@livesession-food-workshop-angular/core/theme";
import {DomPortalModule} from "@livesession-food-workshop-angular/shared/components/dom-portal";
import {StoreModule} from "@ngrx/store";
import {ORDERS_REDUX_KEY} from "./state/orders-state.model";
import {ordersReducer} from "./state/orders.reducer";
import {EffectsModule} from "@ngrx/effects";
import {OrdersEffects} from "./state/orders.effects";
import {OrderCardListModule} from "@livesession-food-workshop-angular/food-shop/orders/order-card-list";
import {FoodShopOrdersOrderDetailsModule} from "@livesession-food-workshop-angular/food-shop/orders/order-details";


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrdersRouting,
    MaterialModule,
    DomPortalModule,
    StoreModule.forFeature(ORDERS_REDUX_KEY, ordersReducer),
    EffectsModule.forFeature([OrdersEffects]),
    OrderCardListModule,
    FoodShopOrdersOrderDetailsModule
  ],
  exports: []
})
export class OrdersModule {

}
