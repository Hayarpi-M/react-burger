import { rootReducer } from './index'; 
import { burgerIngredientsReducer } from './BurgerIngredients';
import { burgerConstructorReducer } from './BurgerConstructor';
import { ingredientModalReducer } from './IngredientModal';
import { orderReducer } from './Order';
import { authReducer } from './auth';
import { resetReducer } from './reset';
import { orderIntentReducer } from './orderIntent';
import { wsReducer } from './wsReducer';

describe('rootReducer', () => {
  it('should return the initial combined state', () => {
    const initAction = { type: '@@INIT' } as any;

    const expectedState = {
      ingredients: burgerIngredientsReducer(undefined, initAction),
      constructors: burgerConstructorReducer(undefined, initAction),
      modal: ingredientModalReducer(undefined, initAction),
      order: orderReducer(undefined, initAction),
      auth: authReducer(undefined, initAction),
      reset: resetReducer(undefined, initAction),
      orderIntent: orderIntentReducer(undefined, initAction),
      wsProfile: wsReducer(undefined, initAction),
    };

    expect(rootReducer(undefined, initAction)).toEqual(expectedState);
  });
});
