import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoriteListComponent} from "./components/favorite-list/favorite-list.component";
import {FavoriteWidgetComponent} from "./components/favorite-widget/favorite-widget.component";
import {MatBadgeModule} from "@angular/material/badge";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    FavoriteListComponent,
    FavoriteWidgetComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  exports: [FavoriteWidgetComponent]
})
export class FoodShopFavoriteFavoriteWidgetModule {
}
