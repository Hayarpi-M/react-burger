import { SET_ORDER_INTENT, CLEAR_ORDER_INTENT } from '../actions/orderIntent';

const initialState = {
  ingredientIds: [],
};

export const orderIntentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_INTENT:
      return { ...state, ingredientIds: action.payload };
    case CLEAR_ORDER_INTENT:
      return { ...state, ingredientIds: [] };
    default:
      return state;
  }
};