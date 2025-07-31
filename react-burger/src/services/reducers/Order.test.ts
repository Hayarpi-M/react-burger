import { orderReducer } from './Order'; // Adjust the path if necessary
import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED
} from '../actions/Order';
import { CLOSE_ORDER_MODAL } from './Order';
import { TOrderActions } from './Order';

describe('orderReducer', () => {
  const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    isModalOpen: false
  };

  const mockOrder = { number: 1234 };

  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: '@@INIT' } as any)).toEqual(initialState);
  });

  it('should handle MAKE_ORDER_REQUEST', () => {
    const action: TOrderActions = { type: MAKE_ORDER_REQUEST };
    const expectedState = {
      ...initialState,
      orderRequest: true
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle MAKE_ORDER_SUCCESS', () => {
    const action: TOrderActions = { type: MAKE_ORDER_SUCCESS, payload: mockOrder };
    const expectedState = {
      ...initialState,
      order: mockOrder,
      orderRequest: false,
      isModalOpen: true
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle MAKE_ORDER_FAILED', () => {
    const action: TOrderActions = { type: MAKE_ORDER_FAILED };
    const expectedState = {
      ...initialState,
      orderFailed: true,
      orderRequest: false
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLOSE_ORDER_MODAL', () => {
    const stateWithOrder = {
      ...initialState,
      order: mockOrder,
      isModalOpen: true
    };

    const action: TOrderActions = { type: CLOSE_ORDER_MODAL };
    const expectedState = {
      ...initialState
    };

    expect(orderReducer(stateWithOrder, action)).toEqual(expectedState);
  });
});
