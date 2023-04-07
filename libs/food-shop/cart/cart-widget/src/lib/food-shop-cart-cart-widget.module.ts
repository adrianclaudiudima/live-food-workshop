import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartListComponent} from "./components/cart-list/cart-list.component";
import {CartWidgetComponent} from "./components/cart-widget/cart-widget.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";

@NgModule({
  declarations: [
    CartListComponent,
    CartWidgetComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [
    CartWidgetComponent
  ]
})
export class FoodShopCartCartWidgetModule {
}
