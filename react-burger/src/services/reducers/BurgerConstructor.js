import { ADD_INGREDIENT, REMOVE_INGREDIENT, REORDER_INGREDIENTS, CLEAR_CONSTRUCTOR } from '../actions/BurgerConstructor';

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
