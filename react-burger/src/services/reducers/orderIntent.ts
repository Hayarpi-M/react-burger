import { Interface } from 'readline';
import { SET_ORDER_INTENT, CLEAR_ORDER_INTENT } from '../actions/orderIntent';

export interface IOrderIntentState {
  ingredientIds: string[];
}

export type TOrderIntentActions =
  | { type: typeof SET_ORDER_INTENT; payload: string[] }
  | { type: typeof CLEAR_ORDER_INTENT };
  
const initialState: IOrderIntentState = {
  ingredientIds: [],
};

export const orderIntentReducer = (state = initialState, action:TOrderIntentActions) => {
  switch (action.type) {
    case SET_ORDER_INTENT:
      return { ...state, ingredientIds: action.payload };
    case CLEAR_ORDER_INTENT:
      return { ...state, ingredientIds: [] };
    default:
      return state;
  }
};