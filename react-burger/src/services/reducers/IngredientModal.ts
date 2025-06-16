import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from '../actions/IngredientModal';

import { TIngredient } from '../../types/ingredients';
import { Interface } from 'readline';

export interface IIngredientModalState {
  currentIngredient: TIngredient | null;
}

export type TIngredientModalActions = 
| {type: typeof SET_CURRENT_INGREDIENT; payload: TIngredient}
| {type: typeof CLEAR_CURRENT_INGREDIENT};

const initialState: IIngredientModalState = {
  currentIngredient: null,
};

export const ingredientModalReducer = (state = initialState, action:TIngredientModalActions) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: action.payload };
    case CLEAR_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: null };
    default:
      return state;
  }
};
