import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { rootReducer } from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWsMiddleware } from './middleware/wsMiddleware';
import type { Middleware, AnyAction, Dispatch  } from '@reduxjs/toolkit';

import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_CONNECT_SUCCESS,
  WS_CONNECT_ERROR,
  WS_DISCONNECT_SUCCESS,
  WS_GET_MESSAGE,
  WS_PROFILE_CONNECT,
  WS_PROFILE_DISCONNECT,
  WS_PROFILE_CONNECT_SUCCESS,
  WS_PROFILE_CONNECT_ERROR,
  WS_PROFILE_DISCONNECT_SUCCESS,
  WS_PROFILE_GET_MESSAGE
} from './actions/wsAction';


const publicFeedMiddleware = createWsMiddleware({
  wsInit: WS_CONNECT,
  wsSendMessage: WS_DISCONNECT, // only if you send via socket; optional
  onOpen: WS_CONNECT_SUCCESS,
  onClose: WS_DISCONNECT_SUCCESS,
  onError: WS_CONNECT_ERROR,
  onMessage: WS_GET_MESSAGE
});
const profileFeedMiddleware = createWsMiddleware({
  wsInit: WS_PROFILE_CONNECT,
  wsSendMessage: WS_PROFILE_DISCONNECT, // optional
  onOpen: WS_PROFILE_CONNECT_SUCCESS,
  onClose: WS_PROFILE_DISCONNECT_SUCCESS,
  onError: WS_PROFILE_CONNECT_ERROR,
  onMessage: WS_PROFILE_GET_MESSAGE
}, true);
//export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ optionally disable this for WS messages
      thunk: true
    }).concat( publicFeedMiddleware as Middleware<any, any, Dispatch<AnyAction>>, profileFeedMiddleware as Middleware<any, any, Dispatch<AnyAction>>),
  devTools: process.env.NODE_ENV !== 'production',
});