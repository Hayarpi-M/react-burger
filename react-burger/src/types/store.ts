// src/types/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers';

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

