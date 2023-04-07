import {Component, Inject, TemplateRef, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "@livesession-food-workshop-angular/core/model";

@Component({
  selector: "app-overlay-product-details",
  templateUrl: 'product-details-overlay.component.html'
})

export class OverlayProductDetailsDialog {

  product: Product;
  isFavoriteProduct$!: Observable<boolean>;
  numberOfServing: number;
  matSnackbarRef!: MatSnackBarRef<any>;

  @ViewChild("templatePortalContent") templatePortalContent!: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<OverlayProductDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product; numberOfServings: number },
    private snackBar: MatSnackBar,
    // private cartStateService: CartStateService,
    // private favoriteStateService: FavoriteStateService
  ) {
    this.product = data.product;
    this.numberOfServing = data.numberOfServings;
    /*this.isFavoriteProduct$ = favoriteStateService.isFavoriteProduct(this.product).pipe(
      take(1)
    );*/
  }

  closeDialog() {
    this.dialogRef.close();
  }


  handleAddToBag(item: { product: Product; quantity: number }) {
    // this.cartStateService.addProductToCart(item);
    this.dialogRef.close();
    this.matSnackbarRef = this.snackBar.openFromTemplate(this.templatePortalContent,
      {
        horizontalPosition: "end",
        verticalPosition: "top",
        data: item.product,
        duration: 4000,
        panelClass: "custom-snackbar"
      });
  }

  handleFavoriteChanged(payload: { product: Product; favorite: boolean }) {
    // this.favoriteStateService.updateFavoriteState(payload);
  }
}
