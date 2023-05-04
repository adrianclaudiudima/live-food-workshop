import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {map, Observable, switchMap, tap} from "rxjs";
import {MatSnackBarRef} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app-state.module";
import {getShopStateWithProductsFiltered} from "../../store/shop.selectors";
import {ShopState} from "../../store/shop-state.module";
import {CategorySummary, Product, ProductType} from "@livesession-food-workshop-angular/core/model";
import {filterProductsAction} from "../../store/shop.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {addProductToCartAction} from "../../../cart/store/cart.actions";
import {MatDialog} from "@angular/material/dialog";
import {ProductDetailsOverlayComponent} from "../product-details-overlay/product-details-overlay.component";

@Component({
  selector: 'livesession-food-workshop-angular-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit {


  matSnackbarRef: MatSnackBarRef<any> | undefined;
  @ViewChild('templatePortalContent')
  templatePortalContent!: TemplateRef<any>;

  shopState$!: Observable<ShopState>;

  constructor(private dialog: MatDialog, private store: Store<AppState>, private activatedRoute: ActivatedRoute, private router: Router) {
    this.shopState$ = this.activatedRoute.queryParamMap.pipe(
      map(paramMap => paramMap.get('filter')),
      tap(v => {
        this.store.dispatch(filterProductsAction({productType: v === null ? undefined : v as ProductType}))
      }),
      switchMap(_ => this.store.select(getShopStateWithProductsFiltered))
    )
  }


  ngOnInit(): void {
  }

  filterProducts(categorySummary: CategorySummary | undefined) {
    this.router.navigate(['/'], {queryParams: {filter: categorySummary?.type}})
    // this.store.dispatch(filterProductsAction({productType: categorySummary?.type}))
  }

  handleAddToBag(product: Product) {
    this.store.dispatch(addProductToCartAction({productOrder: {product, quantity: 1}}))
  }

  showProductDetails(product: Product) {
    this.dialog.open(ProductDetailsOverlayComponent, {
      width: '100%',
      maxWidth: '584px',
      maxHeight: '90vh',
      panelClass: 'no-padding-dialog',
      data: {
        product,
        numberOfServings: 1,
      },
    });
  }
}
