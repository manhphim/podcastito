import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { useDispatch } from 'react-redux';

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
