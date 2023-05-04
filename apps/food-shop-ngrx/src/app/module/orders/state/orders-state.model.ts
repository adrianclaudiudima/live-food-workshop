import {DomainEntity, Order, RequestStatus} from "@livesession-food-workshop-angular/core/model";
import {EntityState} from "@ngrx/entity";

export interface OrdersState extends EntityState<Order> {
  requestStatus: RequestStatus;
  selectedOrder: DomainEntity<Order | undefined>;
}

export const ORDERS_REDUX_KEY = 'orders';
