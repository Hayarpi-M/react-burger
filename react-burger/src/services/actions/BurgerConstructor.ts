import { v4 as uuidv4 } from 'uuid';
import { TIngredientConstructor } from '../../types/ingredients';

export const ADD_INGREDIENT = 'ADD_INGREDIENT' as const;
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT' as const;
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS' as const;
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR' as const;

export interface IAddIngredientAction {
  type: typeof ADD_INGREDIENT;
  payload: TIngredientConstructor;
}

export interface IRemoveIngredientAction {
  type: typeof REMOVE_INGREDIENT;
  payload: string; // UUID
}

export interface IReorderIngredientsAction {
  type: typeof REORDER_INGREDIENTS;
  payload: TIngredientConstructor[];
}

export interface IClearConstructorAction {
  type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IReorderIngredientsAction
  | IClearConstructorAction;


export const addIngredient = (item:  Omit<TIngredientConstructor, 'uuid'>): IAddIngredientAction => ({
  type: 'ADD_INGREDIENT',
  payload: { ...item, uuid: uuidv4() },
});

export const removeIngredient = (uuid: string) => ({
  type: 'REMOVE_INGREDIENT',
  payload: uuid,
});

export const reorderIngredients = (ingredients: TIngredientConstructor[]): IReorderIngredientsAction => ({
  type: 'REORDER_INGREDIENTS',
  payload: ingredients,
});

export const clearConstructor = (): IClearConstructorAction => ({ type: 'CLEAR_CONSTRUCTOR' });