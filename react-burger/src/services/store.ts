import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { rootReducer } from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

//export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;