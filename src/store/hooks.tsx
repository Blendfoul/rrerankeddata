import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useRaceispatch = () => useDispatch<AppDispatch>();
export const useRaceSelector: TypedUseSelectorHook<RootState> = useSelector;
