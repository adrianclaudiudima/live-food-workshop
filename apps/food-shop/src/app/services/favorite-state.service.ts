import {Injectable} from "@angular/core";
import {Product} from "@livesession-food-workshop-angular/core/model";
import {BehaviorSubject, map, Observable} from "rxjs";
import {StateSerializerService} from "@livesession-food-workshop-angular/core/services/api-service";


@Injectable()
export class FavoriteStateService {


  private favoriteProducts: Array<Product> = [];
  private favoriteProductsSubject: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  public favoriteProducts$: Observable<Array<Product>> = this.favoriteProductsSubject.asObservable();


  constructor(private stateSerializer: StateSerializerService) {
    this.favoriteProducts = this.stateSerializer.restoreState().favoriteProducts;
    this.updateSubjectAndStoreToLocalStorage(this.favoriteProducts);
  }


  public updateFavoriteState(payload: { product: Product, favorite: boolean }): void {
    if (!payload.favorite) {
      this.favoriteProducts = this.favoriteProducts.filter(product => product.id !== payload.product.id);
    } else {
      if (!this.favoriteProducts.find(prod => prod.id === payload.product.id)) {
        this.favoriteProducts.push(payload.product)
      }
    }
    this.updateSubjectAndStoreToLocalStorage(this.favoriteProducts)
  }


  public removeAll(): void {
    this.favoriteProducts = [];
    this.updateSubjectAndStoreToLocalStorage(this.favoriteProducts);
  }

  public removeProduct(product: Product) {
    this.favoriteProducts = this.favoriteProducts.filter(product => product.id !== product.id);
    this.updateSubjectAndStoreToLocalStorage(this.favoriteProducts);
  }

  private updateSubjectAndStoreToLocalStorage(products: Product[]): void {
    this.favoriteProductsSubject.next(products);
    this.stateSerializer.saveFavoriteProducts(products)
  }


  isFavoriteProduct(payload: Product) {
    return this.favoriteProducts$.pipe(
      map(product => !!product.find(p => p.id === payload.id))
    )
  }
}
