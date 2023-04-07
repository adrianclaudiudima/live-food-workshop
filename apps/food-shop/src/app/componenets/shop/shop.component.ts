import {Component, TemplateRef, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {CategorySummary, Product} from "@livesession-food-workshop-angular/core/model";
import {MatDialog} from "@angular/material/dialog";
import {OverlayProductDetailsDialog} from "../product-details-overlay/product-details-overlay.component";
import {ProductsStateService} from "../../services/products-state.service";

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.component.html'
})
export class ShopComponent {

  shopState!: Observable<any>;

  matSnackbarRef: MatSnackBarRef<any> | undefined;

  @ViewChild("templatePortalContent") templatePortalContent!: TemplateRef<any>;


  constructor(
    private productsStateService: ProductsStateService,
    private dialog: MatDialog, private snackBar: MatSnackBar
  ) {
    productsStateService.loadAllProducts();
    productsStateService.loadAllCategories();
    this.shopState = this.productsStateService.productsState$;

  }

  showProductDetails(product: Product): void {
    this.dialog.open(OverlayProductDetailsDialog, {
      width: "100%",
      maxWidth: "584px",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
      data: {
        product,
        numberOfServings: 1
      }
    });
  }

  handleAddToBag(product: Product) {
    // this.cartStateService.addProductToCart({product, quantity: 1});
    this.matSnackbarRef = this.snackBar.openFromTemplate(this.templatePortalContent,
      {
        horizontalPosition: "end",
        verticalPosition: "top",
        data: product,
        duration: 4000,
        panelClass: "custom-snackbar"
      });
  }

  filterProducts(categorySummary: CategorySummary | undefined) {
    // this.productsStateService.filterProducts(categorySummary);
  }

}
