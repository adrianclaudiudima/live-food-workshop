import {Injectable} from "@angular/core";
import {ProductsStateService} from "../../services/products-state.service";

@Injectable()
export class ShopFacade {

  constructor(private productsStateService: ProductsStateService) {
  }

  public loadProductsAndCategories(): void {
    this.productsStateService.loadAllProducts();
    this.productsStateService.loadAllCategories();
  }


}
