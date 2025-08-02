import { orderIntentReducer, IOrderIntentState, TOrderIntentActions } from './orderIntent'; 
import { SET_ORDER_INTENT, CLEAR_ORDER_INTENT } from '../actions/orderIntent';

describe('orderIntentReducer', () => {
  const initialState: IOrderIntentState = {
    ingredientIds: [],
  };

  it('should return the initial state', () => {
    expect(orderIntentReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle SET_ORDER_INTENT', () => {
    const ingredientIds = ['123', '456', '789'];
    const action: TOrderIntentActions = { type: SET_ORDER_INTENT, payload: ingredientIds };

    const expectedState = {
      ingredientIds,
    };

    expect(orderIntentReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_ORDER_INTENT', () => {
    const populatedState: IOrderIntentState = {
      ingredientIds: ['123', '456'],
    };

    const action: TOrderIntentActions = { type: CLEAR_ORDER_INTENT };
    const expectedState = {
      ingredientIds: [],
    };

    expect(orderIntentReducer(populatedState, action)).toEqual(expectedState);
  });
});