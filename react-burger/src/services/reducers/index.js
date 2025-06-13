import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './BurgerIngredients';
import { burgerConstructorReducer } from './BurgerConstructor';
import { ingredientModalReducer } from './IngredientModal';
import { orderReducer } from './Order';
import { authReducer } from './auth';
import {resetReducer} from './reset';
import { orderIntentReducer } from './orderIntent';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  constructors: burgerConstructorReducer,
  modal: ingredientModalReducer,
  order: orderReducer,
  auth: authReducer,
  reset: resetReducer,
  orderIntent: orderIntentReducer,
});