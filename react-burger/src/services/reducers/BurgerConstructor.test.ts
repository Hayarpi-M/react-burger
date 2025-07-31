import { burgerConstructorReducer } from './BurgerConstructor';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_INGREDIENTS,
  CLEAR_CONSTRUCTOR,
} from '../actions/BurgerConstructor';
import { TIngredientConstructor } from '../../types/ingredients';

const mockBun: TIngredientConstructor = {
  _id: 'bun1',
  name: 'Bun',
  type: 'bun',
  price: 2,
  image: '',
  image_mobile: '',
  image_large: '',
  calories: 100,
  proteins: 5,
  fat: 2,
  carbohydrates: 20,
  uuid: 'uuid-bun',
};

const mockIngredient: TIngredientConstructor = {
  _id: 'sauce1',
  name: 'Sauce',
  type: 'sauce',
  price: 1,
  image: '',
  image_mobile: '',
  image_large: '',
  calories: 50,
  proteins: 1,
  fat: 1,
  carbohydrates: 10,
  uuid: 'uuid-sauce',
};

describe('burgerConstructorReducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {} as any)).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it('should handle ADD_INGREDIENT for bun', () => {
    const action = {
      type: ADD_INGREDIENT,
      payload: mockBun,
    };
    expect(burgerConstructorReducer(undefined, action)).toEqual({
      bun: mockBun,
      ingredients: [],
    });
  });

  it('should handle ADD_INGREDIENT for non-bun', () => {
    const action = {
      type: ADD_INGREDIENT,
      payload: mockIngredient,
    };
    expect(burgerConstructorReducer(undefined, action)).toEqual({
      bun: null,
      ingredients: [mockIngredient],
    });
  });

  it('should handle REMOVE_INGREDIENT', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredient],
    };
    const action = {
      type: REMOVE_INGREDIENT,
      payload: mockIngredient.uuid,
    };
    expect(burgerConstructorReducer(initialState, action)).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it('should handle REORDER_INGREDIENTS', () => {
    const newOrder = [mockIngredient];
    const action = {
      type: REORDER_INGREDIENTS,
      payload: newOrder,
    };
    expect(burgerConstructorReducer(undefined, action)).toEqual({
      bun: null,
      ingredients: newOrder,
    });
  });

  it('should handle CLEAR_CONSTRUCTOR', () => {
    const filledState = {
      bun: mockBun,
      ingredients: [mockIngredient],
    };
    const action = { type: CLEAR_CONSTRUCTOR };
    expect(burgerConstructorReducer(filledState, action)).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});