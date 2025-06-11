import { BASE_URL, checkResponse  } from '../../utils/constants';
export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export const makeOrder = (ids) => async (dispatch, getState) => {
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

      const data = await checkResponse(response); 
      console.log('Order API Response:', data);
      
      if (data && data.order && data.order.number) {
        dispatch({ type: MAKE_ORDER_SUCCESS, payload: data.order });
      } else {
        console.warn('Invalid order data:', data);
        dispatch({ type: MAKE_ORDER_FAILED, error: 'Invalid order response' });
      }
    } catch (error) {
      console.error('Order fetch failed:', error);
      dispatch({ type: MAKE_ORDER_FAILED, error: error.message });
    }
};