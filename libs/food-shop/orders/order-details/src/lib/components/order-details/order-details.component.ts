import { Component, Input } from '@angular/core';
import {Order} from "@livesession-food-workshop-angular/core/model";

@Component({
  selector: 'app-order-details',
  templateUrl: 'order-details.component.html',
})
export class OrderDetailsComponent {
  @Input()
  order!: Order;
}
