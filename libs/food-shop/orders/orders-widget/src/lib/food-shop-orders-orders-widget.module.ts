import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersWidgetComponent} from "./components/orders-widget/orders-widget.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [OrdersWidgetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  exports: [OrdersWidgetComponent]
})
export class FoodShopOrdersOrdersWidgetModule {
}
