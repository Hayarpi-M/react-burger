import { burgerIngredientsReducer } from './BurgerIngredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/BurgerIngredients';
import { TIngredient } from '../../types/ingredients';
import { TBurgerIngredientsActions } from '../reducers/BurgerIngredients';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Mock Ingredient 1',
    type: 'main',
    price: 100,
    image: '',
    image_mobile: '',
    image_large: '',
    calories: 250,
    proteins: 20,
    fat: 10,
    carbohydrates: 30,
  },
  {
    _id: '2',
    name: 'Mock Ingredient 2',
    type: 'sauce',
    price: 50,
    image: '',
    image_mobile: '',
    image_large: '',
    calories: 150,
    proteins: 5,
    fat: 5,
    carbohydrates: 15,
  },
];

describe('burgerIngredientsReducer', () => {
  it('should return the initial state', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as unknown as TBurgerIngredientsActions;
    expect(burgerIngredientsReducer(undefined, unknownAction)).toEqual({
      items: [],
      itemsRequest: false,
      itemsFailed: false,
    });
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    const action: TBurgerIngredientsActions = { type: GET_INGREDIENTS_REQUEST };
    expect(burgerIngredientsReducer(undefined, action)).toEqual({
      items: [],
      itemsRequest: true,
      itemsFailed: false,
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const action: TBurgerIngredientsActions = {
      type: GET_INGREDIENTS_SUCCESS,
      payload: mockIngredients,
    };
    expect(burgerIngredientsReducer(undefined, action)).toEqual({
      items: mockIngredients,
      itemsRequest: false,
      itemsFailed: false,
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const action: TBurgerIngredientsActions = { type: GET_INGREDIENTS_FAILED };
    expect(burgerIngredientsReducer(undefined, action)).toEqual({
      items: [],
      itemsRequest: false,
      itemsFailed: true,
    });
  });
});