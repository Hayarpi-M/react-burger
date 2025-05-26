import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './BurgerIngredients';
import { burgerConstructorReducer } from './BurgerConstructor';
import { ingredientModalReducer } from './IngredientModal';
import { orderReducer } from './Order';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  constructors: burgerConstructorReducer,
  modal: ingredientModalReducer,
  order: orderReducer,
});