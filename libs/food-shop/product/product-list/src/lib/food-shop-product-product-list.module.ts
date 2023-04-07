import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {LayoutModule} from "@angular/cdk/layout";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    LayoutModule,
    MatRippleModule
  ],
  exports: [ProductListComponent]
})
export class FoodShopProductProductListModule {
}
