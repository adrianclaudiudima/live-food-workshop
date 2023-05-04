import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ORDERS_REDUX_KEY, OrdersState} from "./orders-state.model";
import {ordersEntityAdapter} from "./orders.reducer";
import {DomainEntity, isEntityLoaded, Order, RequestStatus} from "@livesession-food-workshop-angular/core/model";

const ordersFeatureSelector = createFeatureSelector<OrdersState>(ORDERS_REDUX_KEY);

export const getOrdersState = createSelector(ordersFeatureSelector, s1 => s1);

export const getOrdersAsArray = createSelector(getOrdersState, ordersEntityAdapter.getSelectors().selectAll)

export const getOrdersWithRequestStatus = createSelector<OrdersState, OrdersState, Order[], { domain: Array<Order>, requestStatus: RequestStatus }>(getOrdersState, getOrdersAsArray, (ordersState, ordersArray) => {
  return {
    domain: ordersArray,
    requestStatus: ordersState.requestStatus
  }
})

export const getSelectedOrder = createSelector(getOrdersState, s1 => s1.selectedOrder);

export const isOrderDetailsLoaded = (orderId: string) => createSelector<OrdersState, DomainEntity<Order | undefined>, boolean>(getSelectedOrder, (s1) => {
  return isEntityLoaded<Order>(orderId, s1);
})





