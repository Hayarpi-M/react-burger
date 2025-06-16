export const SET_ORDER_INTENT = 'SET_ORDER_INTENT' as const;
export const CLEAR_ORDER_INTENT = 'CLEAR_ORDER_INTENT' as const;

export interface ISetOrderIntentAction {
  type: typeof SET_ORDER_INTENT;
  payload: string[]; 
}

export interface IClearOrderIntentAction {
  type: typeof CLEAR_ORDER_INTENT;
}

export type TOrderIntentActions = ISetOrderIntentAction | IClearOrderIntentAction;


export const setOrderIntent = (ingredientIds:string[]) => ({
  type: SET_ORDER_INTENT,
  payload: ingredientIds,
});

export const clearOrderIntent = () => ({
  type: CLEAR_ORDER_INTENT,
});