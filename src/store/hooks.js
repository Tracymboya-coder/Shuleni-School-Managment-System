import { useDispatch, useSelector } from 'react-redux';
// Use these instead of plain `useDispatch`/`useSelector` everywhere in the app —
// they carry the store's real types, so state and dispatched actions autocomplete correctly.
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;