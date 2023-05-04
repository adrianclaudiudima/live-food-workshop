import {Component, Inject, TemplateRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Product} from "@livesession-food-workshop-angular/core/model";
import {AppState} from "../../../../store/app-state.module";
import {addProductToCartAction} from "../../../cart/store/cart.actions";
import {isProductToFavorite} from "../../../favorite/favorite.selectors";
import {addProductToFavorite, removeProductFromFavorite} from "../../../favorite/favorite.actions";

@Component({
  selector: 'app-product-details-overlay',
  templateUrl: 'product-details-overlay.component.html',
})
export class ProductDetailsOverlayComponent {
  product: Product;
  isFavoriteProduct$: Observable<boolean>;
  numberOfServing: number;
  matSnackbarRef!: MatSnackBarRef<any>;

  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailsOverlayComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { product: Product; numberOfServings: number },
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
    this.product = data.product;
    this.numberOfServing = data.numberOfServings;

    this.isFavoriteProduct$ = this.store.select(isProductToFavorite(data.product.id));
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleAddToBag(item: { product: Product; quantity: number }) {
    this.store.dispatch(addProductToCartAction({productOrder: item}));

    this.dialogRef.close();
    this.matSnackbarRef = this.snackBar.openFromTemplate(this.templatePortalContent, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: item.product,
      duration: 4000,
      panelClass: 'custom-snackbar',
    });
  }

  handleFavoriteChanged(payload: { product: Product; favorite: boolean }) {
    if (payload.favorite) {
      this.store.dispatch(addProductToFavorite({product: payload.product}));
    } else {
      this.store.dispatch(removeProductFromFavorite({product: payload.product}));
    }
  }
}
