import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED } from '../actions/Order';


const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  isModalOpen: false,
};

export const orderReducer = (state = initialState, action) => {
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
