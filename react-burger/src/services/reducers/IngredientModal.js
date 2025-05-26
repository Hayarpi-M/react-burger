import { SET_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from '../actions/IngredientModal';


const initialState = {
  currentIngredient: null,
};

export const ingredientModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: action.payload };
    case CLEAR_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: null };
    default:
      return state;
  }
};
