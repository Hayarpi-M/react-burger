import { Dispatch } from 'redux';
import { BASE_URL, checkResponse  } from '../../utils/constants';
import { TIngredient } from '../../types/ingredients';
import { TOrder } from '../../types/order';
import { AppDispatch } from '../store';
import { RootState } from '../reducers/index';

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export interface IMakeOrderRequestAction {
  type: typeof MAKE_ORDER_REQUEST;
}

export interface IMakeOrderSuccessAction {
  type: typeof MAKE_ORDER_SUCCESS;
  payload: TOrder; 
}

export interface IMakeOrderFailedAction {
  type: typeof MAKE_ORDER_FAILED;
  error?: string;
}
export interface IMakeOrderResponse {
  success: boolean;
  name: string;
  order: TOrder;
}
export type TOrderActions =
  | IMakeOrderRequestAction
  | IMakeOrderSuccessAction
  | IMakeOrderFailedAction;


export const makeOrder = (ids: string[]) => async (dispatch:Dispatch<TOrderActions>, getState: () => RootState) => {
    dispatch({ type: MAKE_ORDER_REQUEST });

    const state = getState();
    const token = state.auth?.user?.accessToken; 

    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ ingredients: ids }),
      });

      const data = await checkResponse<IMakeOrderResponse>(response); 
      console.log('Order API Response:', data);
      
      if (data && data.order && data.order.number) {
        dispatch({ type: MAKE_ORDER_SUCCESS, payload: data.order });
      } else {
        console.warn('Invalid order data:', data);
        dispatch({ type: MAKE_ORDER_FAILED, error: 'Invalid order response' });
      }
    } catch (error: any) {
      console.error('Order fetch failed:', error);
      dispatch({ type: MAKE_ORDER_FAILED, error: error.message });
    }
};