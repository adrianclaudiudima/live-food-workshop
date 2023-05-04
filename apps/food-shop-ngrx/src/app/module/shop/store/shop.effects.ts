import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app-state.module";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  loadProductsAndCategories,
  loadProductsAndCategoriesFailed,
  loadProductsAndCategoriesSuccess
} from "./shop.actions";
import {catchError, forkJoin, map, of, switchMap} from "rxjs";
import {CategoriesApiService, ProductsApiService} from "@livesession-food-workshop-angular/core/services/api-service";


@Injectable()
export class ShopEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private productsApiService: ProductsApiService,
    private categoriesApiService: CategoriesApiService
  ) {
  }

  loadProductsAndCategories$ = createEffect(() => this.actions$.pipe(
    ofType(loadProductsAndCategories),
    switchMap((_) => {
      return forkJoin([
        this.productsApiService.loadProducts(),
        this.categoriesApiService.loadProductCategories()
      ]).pipe(
        map(([products, categories]) => loadProductsAndCategoriesSuccess({products, categories})),
        catchError(err => of(loadProductsAndCategoriesFailed({errorMessage: 'Loading products or categories failed'})))
      )
    })
  ))

}
