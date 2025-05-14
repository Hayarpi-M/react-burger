export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export const makeOrder = (ids) => (dispatch) => {
  dispatch({ type: 'MAKE_ORDER_REQUEST' });

  fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: ids }),
  })
    .then((res) => res.ok ? res.json() : Promise.reject(res.status))
    .then((data) => {
      dispatch({ type: 'MAKE_ORDER_SUCCESS', payload: data.order });
    })
    .catch(() => {
      dispatch({ type: 'MAKE_ORDER_FAILED' });
    });
};
