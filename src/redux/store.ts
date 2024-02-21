import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector
} from 'react-redux';

import reducers from './slice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['load/resume/fulfilled']
      }
    }).concat(logger as any)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default store;
