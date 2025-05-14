
import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addIngredient = (item) => ({
  type: 'ADD_INGREDIENT',
  payload: { ...item, uuid: uuidv4() },
});

export const removeIngredient = (uuid) => ({
  type: 'REMOVE_INGREDIENT',
  payload: uuid,
});

export const reorderIngredients = (ingredients) => ({
  type: 'REORDER_INGREDIENTS',
  payload: ingredients,
});

export const clearConstructor = () => ({ type: 'CLEAR_CONSTRUCTOR' });
