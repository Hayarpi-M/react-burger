import { BASE_URL, checkResponse } from '../../utils/constants';
import { AppDispatch } from '../../types/store';
import { TIngredient } from '../../types/ingredients';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => (dispatch: AppDispatch): void => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });

  fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse<{ data: TIngredient[] }>)
    .then((data) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
    })
    .catch(() => {
      dispatch({ type: GET_INGREDIENTS_FAILED });
    });
};