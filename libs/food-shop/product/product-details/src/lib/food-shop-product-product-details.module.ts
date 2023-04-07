import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {
  SharedComponentsInputNumberButtonModule
} from "@livesession-food-workshop-angular/shared/components/input-number-button";
import {MatRippleModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, SharedComponentsInputNumberButtonModule, MatRippleModule, MatButtonModule],
  exports: [ProductDetailsComponent]
})
export class FoodShopProductProductDetailsModule {
}
