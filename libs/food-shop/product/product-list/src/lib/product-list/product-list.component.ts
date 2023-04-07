import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "@livesession-food-workshop-angular/core/model";

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
})
export class ProductListComponent implements OnInit {
  @Input()
  products: Product[] = [];

  @Output()
  onShowProductDetails: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  onAddToBag: EventEmitter<Product> = new EventEmitter<Product>();

  ngOnInit(): void {
  }

  addToBag(product: Product) {
    this.onAddToBag.emit(product);
  }

  showProductDetails(product: Product) {
    this.onShowProductDetails.emit(product);
  }
}
