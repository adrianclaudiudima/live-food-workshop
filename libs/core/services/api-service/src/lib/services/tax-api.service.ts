import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Tax} from "@livesession-food-workshop-angular/core/model";


@Injectable()
export class TaxApiService {

  public tax!: Tax;

  constructor(private httpClient: HttpClient) {
  }

  public loadTaxDetails(fallback: { sc: number, vt: number }): Observable<Tax> {
    return this.httpClient.get<Tax>('http://localhost:3000/tax').pipe(
      tap(v => this.tax = v),
      catchError(err => of<Tax>({serviceChargePercentage: fallback.sc, vatRatePercentage: fallback.vt}))
    );
  }

  public refresh() {
    return this.httpClient.get<Tax>('http://localhost:3000/tax').pipe(
      tap(v => this.tax = v),
    )
  }
}
