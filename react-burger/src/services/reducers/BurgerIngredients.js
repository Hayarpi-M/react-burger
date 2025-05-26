import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/BurgerIngredients';

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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