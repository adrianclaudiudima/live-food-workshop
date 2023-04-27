import {Component, TemplateRef, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {CategorySummary, Product} from "@livesession-food-workshop-angular/core/model";
import {MatDialog} from "@angular/material/dialog";
import {OverlayProductDetailsDialog} from "../product-details-overlay/product-details-overlay.component";
import {ProductsState, ProductsStateService} from "../../services/products-state.service";
import {ShopFacade} from "./shop.facade";
import {CartStateService} from "../../services/cart-state.service";

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.component.html',
  providers: [ShopFacade]
})
export class ShopComponent {

  shopState!: Observable<ProductsState>;
  matSnackbarRef: MatSnackBarRef<any> | undefined;

  @ViewChild("templatePortalContent") templatePortalContent!: TemplateRef<any>;

  constructor(
    private productsStateService: ProductsStateService,
    private dialog: MatDialog, private snackBar: MatSnackBar,
    private shopFacade: ShopFacade,
    private cartStateService: CartStateService
  ) {

    this.shopState = this.productsStateService.productsState$;
    this.shopFacade.loadProductsAndCategories();
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
    this.cartStateService.addProductToCart({product, quantity: 1});
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
    this.productsStateService.filterProducts(categorySummary);
  }

  retryLoadingProducts() {
    this.shopFacade.loadProductsAndCategories();
  }

}




