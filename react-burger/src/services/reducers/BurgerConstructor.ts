import { ADD_INGREDIENT, REMOVE_INGREDIENT, REORDER_INGREDIENTS, CLEAR_CONSTRUCTOR } from '../actions/BurgerConstructor';
import { TIngredientConstructor } from '../../types/ingredients';

export interface IBurgerConstructorState {
  bun: TIngredientConstructor | null;
  ingredients: Array<TIngredientConstructor>;
}
export type TBurgerConstructorActions =
  | { type: typeof ADD_INGREDIENT; payload: TIngredientConstructor & { uuid: string } }
  | { type: typeof REMOVE_INGREDIENT; payload: string }
  | { type: typeof REORDER_INGREDIENTS; payload: Array<TIngredientConstructor & { uuid: string }> }
  | { type: typeof CLEAR_CONSTRUCTOR };

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action:TBurgerConstructorActions):IBurgerConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT:
      if (action.payload.type === 'bun') {
        return { ...state, bun: action.payload };
      }
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((item) => item.uuid !== action.payload),
      };

    case REORDER_INGREDIENTS:
      return { ...state, ingredients: action.payload };

    case CLEAR_CONSTRUCTOR:
      return initialState;

    default:
      return state;
  }
};
