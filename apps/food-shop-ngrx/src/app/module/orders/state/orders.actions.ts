import {createAction, props} from "@ngrx/store";
import {Order} from "@livesession-food-workshop-angular/core/model";


export const loadOrders = createAction('[ORDERS] Load orders');
export const loadOrdersSuccess = createAction('[ORDERS] Load orders success', props<{ orders: Order[] }>());
export const loadOrdersFailed = createAction('[ORDERS] Load orders failed', props<{ err: any }>());

export const setOrderDetails = createAction('[ORDERS] Set order details', props<{ order: Order }>());

export const loadOrderDetails = createAction('[ORDERS] Load order details', props<{ orderId: string }>())
export const loadOrderDetailsSuccess = createAction('[ORDERS] Load order details success', props<{ order: Order }>())
export const loadOrderDetailsFailed = createAction('[ORDERS] Load order details failed', props<{ error: any }>())
