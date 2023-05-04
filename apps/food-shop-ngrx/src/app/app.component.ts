import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/app-state.module";
import {loadProductsAndCategories} from "./module/shop/store/shop.actions";

@Component({
  selector: 'livesession-food-workshop-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-shop-ngrx';

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadProductsAndCategories())
    // this.store.dispatch(ShopActions.loadProductsAndCategories())

  }

}
