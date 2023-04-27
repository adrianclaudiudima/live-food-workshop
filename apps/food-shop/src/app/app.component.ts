import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'livesession-food-workshop-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-shop';

  constructor(private _httpClient: HttpClient) {
    _httpClient.get('http://localhost:4200/api/product').subscribe()
  }
}
