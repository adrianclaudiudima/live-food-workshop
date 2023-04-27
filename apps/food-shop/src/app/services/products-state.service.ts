import {Injectable} from "@angular/core";
import {CategorySummary, DomainEntity, Product, ProductType} from "@livesession-food-workshop-angular/core/model";
import {BehaviorSubject, catchError, map, Observable, of, Subject, take, tap} from "rxjs";
import {CategoriesApiService, ProductsApiService} from "@livesession-food-workshop-angular/core/services/api-service";
import {filterProducts} from "./products-state.util";


export interface ProductsState {
  categories: DomainEntity<CategorySummary[]>;
  products: DomainEntity<Product[]>;
  filter: ProductType | undefined;
}

@Injectable()
export class ProductsStateService {


  constructor(private productsApiService: ProductsApiService, private categoriesApiService: CategoriesApiService) {
  }

  private productsState: ProductsState = {
    filter: undefined,
    categories: {
      domain: [],
      requestStatus: {
        status: 'NEW'
      }
    },
    products: {
      domain: [],
      requestStatus: {
        status: 'NEW'
      }
    }
  }

  public loadAllProducts(): void {
    this.updateProductsState({
      domain: [],
      requestStatus: {
        status: 'PENDING'
      }
    })
    this.productsApiService.loadProducts().pipe(
      map<Product[], DomainEntity<Product[]>>(value => ({
        domain: value,
        requestStatus: {status: "COMPLETED", error: undefined}
      })),
      catchError(err => (of<DomainEntity<Product[]>>({
          domain: [],
          requestStatus: {
            status: "ERROR", error: {
              code: err.code,
              message: "Something went wrong."
            }
          }
        }))
      ),
      tap<DomainEntity<Product[]>>(v => this.updateProductsState(v)),
      take(1))
      .subscribe();
  }

  public loadAllCategories(): void {
    this.updateCategoriesState({
        domain: [],
        requestStatus: {
          status: 'PENDING'
        }
      }
    )

    this.categoriesApiService.loadProductCategories().pipe(
      map<CategorySummary[], DomainEntity<CategorySummary[]>>(value => ({
        domain: value,
        requestStatus: {status: "COMPLETED", error: undefined}
      })),
      catchError(err => (of<DomainEntity<CategorySummary[]>>({
          domain: [],
          requestStatus: {
            status: "ERROR", error: {
              code: err.code,
              message: "Something went wrong."
            }
          }
        }))
      ),
      tap<DomainEntity<CategorySummary[]>>(v => this.updateCategoriesState(v)),
      take(1)
    )
      .subscribe();
  }


  private productsStateSubject: Subject<ProductsState> = new BehaviorSubject(this.productsState);
  public productsState$: Observable<ProductsState> = this.productsStateSubject.asObservable().pipe(
    map(state => filterProducts(state))
  );

  private updateProductsState(products: DomainEntity<Product[]>): void {
    this.productsState = {...this.productsState, products};
    this.productsStateSubject.next(this.productsState);
  }

  private updateCategoriesState(categories: DomainEntity<CategorySummary[]>): void {
    this.productsState = {...this.productsState, categories};
    this.productsStateSubject.next(this.productsState);
  }

  filterProducts(categorySummary: CategorySummary | undefined): void {
    this.productsState = {
      ...this.productsState, filter: categorySummary === undefined ? undefined : categorySummary.type
    };
    this.productsStateSubject.next(this.productsState);
  }

}
