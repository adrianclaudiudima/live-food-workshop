import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from "@livesession-food-workshop-angular/core/model";

@Injectable()
export class ProductsApiService {
  constructor(private httpClient: HttpClient) {
  }

  public loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:3000/product');
  }
}
