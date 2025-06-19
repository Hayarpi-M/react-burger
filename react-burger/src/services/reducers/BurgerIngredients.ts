import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/BurgerIngredients';

import { TIngredient } from '../../types/ingredients';

export interface IBurgerIngredientsState {
  items: TIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;
}
export type TBurgerIngredientsActions =
  | { type: typeof GET_INGREDIENTS_REQUEST }
  | { type: typeof GET_INGREDIENTS_SUCCESS; payload: TIngredient[] }
  | { type: typeof GET_INGREDIENTS_FAILED };
  
const initialState: IBurgerIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action:TBurgerIngredientsActions): IBurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, itemsRequest: true };
    case GET_INGREDIENTS_SUCCESS:
      return { ...state, items: action.payload, itemsRequest: false };
    case GET_INGREDIENTS_FAILED:
      return { ...state, itemsFailed: true, itemsRequest: false };
    default:
      return state;
  }
};