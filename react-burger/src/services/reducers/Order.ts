import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED } from '../actions/Order';

export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export interface IOrder {
  number: number;
}

// Define state type
export interface IOrderState {
  order: IOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
  isModalOpen: boolean;
}

// Define action types
export type TOrderActions =
  | { type: typeof MAKE_ORDER_REQUEST }
  | { type: typeof MAKE_ORDER_SUCCESS; payload: IOrder }
  | { type: typeof MAKE_ORDER_FAILED }
  | { type: typeof CLOSE_ORDER_MODAL };

const initialState:IOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  isModalOpen: false,
};

export const orderReducer = (state = initialState, action:TOrderActions) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST:
      return { ...state, orderRequest: true };
    case MAKE_ORDER_SUCCESS:
      return { ...state, order: action.payload, orderRequest: false, isModalOpen: true, };
    case MAKE_ORDER_FAILED:
      return { ...state, orderFailed: true, orderRequest: false };
    case 'CLOSE_ORDER_MODAL':
      return {
        ...state,
        isModalOpen: false,
        order: null,
      };
    default:
      return state;
  }
};
