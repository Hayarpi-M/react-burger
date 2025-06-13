export const SET_ORDER_INTENT = 'SET_ORDER_INTENT';
export const CLEAR_ORDER_INTENT = 'CLEAR_ORDER_INTENT';

export const setOrderIntent = (ingredientIds) => ({
  type: SET_ORDER_INTENT,
  payload: ingredientIds,
});

export const clearOrderIntent = () => ({
  type: CLEAR_ORDER_INTENT,
});