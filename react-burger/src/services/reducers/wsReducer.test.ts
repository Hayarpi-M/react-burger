import { wsReducer } from './wsReducer';
import {
  WS_CONNECT_SUCCESS,
  WS_CONNECT_ERROR,
  WS_DISCONNECT_SUCCESS,
  WS_GET_MESSAGE,
  WS_PROFILE_CONNECT_SUCCESS,
  WS_PROFILE_CONNECT_ERROR,
  WS_PROFILE_DISCONNECT_SUCCESS,
  WS_PROFILE_GET_MESSAGE
} from '../actions/wsAction';

import { TOrder } from '../../types/order';

const testOrder: TOrder = {
  _id: 'test123',
  name: 'Test Order',
  status: 'pending',
  ingredients: ['ing1', 'ing2'],
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  number: 1,
};

const initialState = {
  public: {
    connected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
  },
  profile: {
    connected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
  },
};

describe('wsReducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle WS_CONNECT_SUCCESS', () => {
    const nextState = wsReducer(initialState, { type: WS_CONNECT_SUCCESS });
    expect(nextState.public.connected).toBe(true);
    expect(nextState.public.error).toBeNull();
  });

  it('should handle WS_CONNECT_ERROR', () => {
    const errorEvent = new Event('error');
    const nextState = wsReducer(initialState, { type: WS_CONNECT_ERROR, payload: errorEvent });
    expect(nextState.public.connected).toBe(false);
    expect(nextState.public.error).toBe(errorEvent);
  });

  it('should handle WS_DISCONNECT_SUCCESS', () => {
    const prevState = {
      ...initialState,
      public: {
        connected: true,
        orders: [testOrder],
        total: 10,
        totalToday: 5,
        error: null,
      },
    };
    const nextState = wsReducer(prevState, { type: WS_DISCONNECT_SUCCESS });
    expect(nextState.public).toEqual(initialState.public);
  });

  it('should handle WS_GET_MESSAGE', () => {
    const payload = {
      orders: [testOrder],
      total: 100,
      totalToday: 10,
    };
    const nextState = wsReducer(initialState, { type: WS_GET_MESSAGE, payload });
    expect(nextState.public.orders).toEqual([testOrder]);
    expect(nextState.public.total).toBe(100);
    expect(nextState.public.totalToday).toBe(10);
  });

  it('should handle WS_PROFILE_CONNECT_SUCCESS', () => {
    const nextState = wsReducer(initialState, { type: WS_PROFILE_CONNECT_SUCCESS });
    expect(nextState.profile.connected).toBe(true);
    expect(nextState.profile.error).toBeNull();
  });

  it('should handle WS_PROFILE_CONNECT_ERROR', () => {
    const errorEvent = new Event('error');
    const nextState = wsReducer(initialState, { type: WS_PROFILE_CONNECT_ERROR, payload: errorEvent });
    expect(nextState.profile.connected).toBe(false);
    expect(nextState.profile.error).toBe(errorEvent);
  });

  it('should handle WS_PROFILE_DISCONNECT_SUCCESS', () => {
    const prevState = {
      ...initialState,
      profile: {
        connected: true,
        orders: [testOrder],
        total: 50,
        totalToday: 5,
        error: null,
      },
    };
    const nextState = wsReducer(prevState, { type: WS_PROFILE_DISCONNECT_SUCCESS });
    expect(nextState.profile).toEqual(initialState.profile);
  });

  it('should handle WS_PROFILE_GET_MESSAGE with orders', () => {
    const payload = {
      orders: [testOrder],
      total: 200,
      totalToday: 20,
    };
    const nextState = wsReducer(initialState, { type: WS_PROFILE_GET_MESSAGE, payload });
    expect(nextState.profile.orders).toEqual([testOrder]);
    expect(nextState.profile.total).toBe(200);
    expect(nextState.profile.totalToday).toBe(20);
  });

  it('should handle WS_PROFILE_GET_MESSAGE with empty orders', () => {
    const payload = {
      orders: [],
      total: 300,
      totalToday: 30,
    };
    const nextState = wsReducer(initialState, { type: WS_PROFILE_GET_MESSAGE, payload });
    expect(nextState.profile.orders.length).toBe(1);
    expect(nextState.profile.orders[0].name).toBe('Тест заказ');
  });
});
