import {createReducer, on} from "@ngrx/store";
import {OrdersState} from "./orders-state.model";
import {createEntityAdapter} from "@ngrx/entity";
import {Order} from "@livesession-food-workshop-angular/core/model";
import {loadOrderDetails, loadOrderDetailsFailed, loadOrderDetailsSuccess, loadOrders, loadOrdersFailed, loadOrdersSuccess, setOrderDetails} from "./orders.actions";


export const ordersEntityAdapter = createEntityAdapter<Order>()


export const initialOrdersState: OrdersState = {
  ...ordersEntityAdapter.getInitialState(),
  requestStatus: {
    status: 'NEW'
  },
  selectedOrder: {
    domain: undefined,
    requestStatus: {
      status: 'NEW'
    }
  }
}

export const ordersReducer = createReducer<OrdersState>(initialOrdersState,
  on(loadOrders, (state) => {
    return {
      ...state,
      requestStatus: {
        status: 'PENDING'
      }
    }
  }),
  on(loadOrdersSuccess, (state, {orders}) => {
    return {
      ...ordersEntityAdapter.setAll(orders, state),
      requestStatus: {
        status: 'COMPLETED'
      }
    }
  }),
  on(loadOrdersFailed, (state, {err}) => {
    return {
      ...ordersEntityAdapter.removeAll(state),
      requestStatus: {
        status: 'ERROR',
        error: {
          message: err
        }
      }
    }
  }),
  on(loadOrderDetails, (state) => {
    return {
      ...state,
      selectedOrder: {
        domain: undefined,
        requestStatus: {
          status: 'PENDING'
        }
      }
    }
  }),
  on(loadOrderDetailsSuccess, (state, {order}) => {
    return {
      ...state,
      selectedOrder: {
        domain: order,
        requestStatus: {
          status: 'COMPLETED'
        }
      }
    }
  }),
  on(loadOrderDetailsFailed, (state, {error}) => {
    return {
      ...state,
      selectedOrder: {
        domain: undefined,
        requestStatus: {
          status: 'ERROR',
          error: {
            message: error
          }
        }
      }
    }
  }),
  on(setOrderDetails, (state, {order}) => {
    return {
      ...state,
      selectedOrder: {
        domain: order,
        requestStatus: {
          status: 'COMPLETED'
        }
      }
    }
  })
)
