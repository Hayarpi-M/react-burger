// src/services/reducers/wsReducer.ts

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

type TWSState = {
  public: {
    connected: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
    error: Event | null;
  };
  profile: {
    connected: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
    error: Event | null;
  };
};

const initialState: TWSState = {
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

export const wsReducer = (state = initialState, action: any): TWSState => {
  switch (action.type) {
    // Public feed
    case WS_CONNECT_SUCCESS:
      return { ...state, public: { ...state.public, connected: true, error: null } };
    case WS_CONNECT_ERROR:
      return { ...state, public: { ...state.public, connected: false, error: action.payload } };
    case WS_DISCONNECT_SUCCESS:
      return { ...state, public: { connected: false, orders: [], total: 0, totalToday: 0, error: null } };
    case WS_GET_MESSAGE:
      console.log(action.payload)
      return {
        ...state,
        public: {
          ...state.public,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        }
      };

    // Profile orders
    case WS_PROFILE_CONNECT_SUCCESS:
      return { ...state, profile: { ...state.profile, connected: true, error: null } };
    case WS_PROFILE_CONNECT_ERROR:
      return { ...state, profile: { ...state.profile, connected: false, error: action.payload } };
    case WS_PROFILE_DISCONNECT_SUCCESS:
      return { ...state, profile: { connected: false, orders: [], total: 0, totalToday: 0, error: null } };
    case WS_PROFILE_GET_MESSAGE:
      console.log('🎯 Reducer received profile WS message:', action.payload);
      return {
        ...state,
        profile: {
          ...state.profile,
          orders: action.payload.orders.length > 0 ? action.payload.orders : [
            {
              _id: 'test-id',
              name: 'Тест заказ',
              status: 'done',
              ingredients: ['test-ingredient'],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              number: 123456,
            }
          ],
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        }
      };

    default:
      return state;
  }
};