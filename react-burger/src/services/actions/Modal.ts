import { TIngredient } from '../../types/ingredients';
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT' as const;
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT' as const;

export interface ISetCurrentIngredientAction {
  type: typeof SET_CURRENT_INGREDIENT;
  payload: TIngredient;
}

export interface IClearCurrentIngredientAction {
  type: typeof CLEAR_CURRENT_INGREDIENT;
}

export type TCurrentIngredientActions =
  | ISetCurrentIngredientAction
  | IClearCurrentIngredientAction;

export const setCurrentIngredient = (item:TIngredient):ISetCurrentIngredientAction => ({
  type: 'SET_CURRENT_INGREDIENT',
  payload: item,
});

export const clearCurrentIngredient = (): IClearCurrentIngredientAction => ({
  type: 'CLEAR_CURRENT_INGREDIENT',
});
