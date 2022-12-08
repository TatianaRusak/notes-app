import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { store } from '../store/store';

type RootState = ReturnType<typeof store.getState>;

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
