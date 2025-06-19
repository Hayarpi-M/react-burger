import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../services/reducers/index';
import { AppDispatch } from '../services/store';

// Typed versions of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
