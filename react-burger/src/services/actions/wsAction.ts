// src/services/actions/wsActions.ts

// Public feed
export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_CONNECT_SUCCESS = 'WS_CONNECT_SUCCESS';
export const WS_CONNECT_ERROR = 'WS_CONNECT_ERROR';
export const WS_DISCONNECT_SUCCESS = 'WS_DISCONNECT_SUCCESS';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';

// Profile orders
export const WS_PROFILE_CONNECT = 'WS_PROFILE_CONNECT';
export const WS_PROFILE_DISCONNECT = 'WS_PROFILE_DISCONNECT';
export const WS_PROFILE_CONNECT_SUCCESS = 'WS_PROFILE_CONNECT_SUCCESS';
export const WS_PROFILE_CONNECT_ERROR = 'WS_PROFILE_CONNECT_ERROR';
export const WS_PROFILE_DISCONNECT_SUCCESS = 'WS_PROFILE_DISCONNECT_SUCCESS';
export const WS_PROFILE_GET_MESSAGE = 'WS_PROFILE_GET_MESSAGE';

// Action creators
export const wsConnect = (url: string) => ({
  type: WS_CONNECT,
  payload: url,
});

export const wsDisconnect = () => ({
  type: WS_DISCONNECT,
});

export const wsProfileConnect = (url: string) => ({
  type: WS_PROFILE_CONNECT,
  payload: url,
});

export const wsProfileDisconnect = () => ({
  type: WS_PROFILE_DISCONNECT,
});
