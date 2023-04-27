import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {IconRegistryModule, MaterialModule} from "@livesession-food-workshop-angular/core/theme";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LayoutModule} from "@angular/cdk/layout";
import {BoOrdersStatsService} from "./services/bo-orders-stats.service";
import {BoOrdersService} from "./services/bo-orders.service";
import {BoOrdersPaginatedService} from "./services/bo-orders-paginated.service";
import {DashboardComponent} from "./componenets/dashboard/dashboard.component";
import {DomPortalModule} from "@livesession-food-workshop-angular/shared/components/dom-portal";
import {OrdersComponent} from "./componenets/orders/orders.component";
import {
  OrderStatusTableModule
} from "@livesession-food-workshop-angular/food-shop-backoffice/orders/order-status-table";
import {OrdersStatsModule} from "@livesession-food-workshop-angular/food-shop-backoffice/orders/stats";
import {AppRouting} from "./app.routing";
import {ApiServiceModule} from "@livesession-food-workshop-angular/core/services/api-service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrdersComponent
  ],
  imports: [
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MaterialModule,
    IconRegistryModule,
    AppRouting,
    DomPortalModule,
    OrderStatusTableModule,
    OrdersStatsModule,
    ApiServiceModule
  ],
  providers: [
    BoOrdersService,
    BoOrdersPaginatedService,
    BoOrdersStatsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
