import { ingredientModalReducer } from './IngredientModal'; 
import {
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT
} from '../actions/IngredientModal';
import { TIngredient } from '../../types/ingredients';

describe('ingredientModalReducer', () => {
  const mockIngredient: TIngredient = {
    _id: '123',
    name: 'Test Ingredient',
    type: 'main',
    price: 100,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url',
    calories: 10,
    proteins: 5,
    fat: 2,
    carbohydrates: 3
  };

  it('should return the initial state', () => {
    expect(ingredientModalReducer(undefined, { type: '@@INIT' } as any)).toEqual({
      currentIngredient: null
    });
  });

  it('should handle SET_CURRENT_INGREDIENT', () => {
    const action = {
      type: SET_CURRENT_INGREDIENT,
      payload: mockIngredient
    };

    const expectedState = {
      currentIngredient: mockIngredient
    };

    expect(ingredientModalReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_CURRENT_INGREDIENT', () => {
    const initialState = {
      currentIngredient: mockIngredient
    };

    const action = { type: CLEAR_CURRENT_INGREDIENT };

    const expectedState = {
      currentIngredient: null
    };

    expect(ingredientModalReducer(initialState, action)).toEqual(expectedState);
  });
});
