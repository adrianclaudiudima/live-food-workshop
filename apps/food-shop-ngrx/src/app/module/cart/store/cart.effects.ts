import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app-state.module";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {moveProductsToCartFromFavoriteAction} from "./cart.actions";
import {map} from "rxjs";
import {removeAllProductsFromFavorite} from "../../favorite/favorite.actions";


@Injectable()
export class CartEffects {

  constructor(private _store: Store<AppState>, private _actions$: Actions) {
  }

  moveAllProductsFromFavoriteToCart$ = createEffect(() => this._actions$.pipe(
    ofType(moveProductsToCartFromFavoriteAction),
    map(_ => removeAllProductsFromFavorite())
  ))

}
