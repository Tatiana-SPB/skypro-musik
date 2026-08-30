import {
  setAccessToken,
  setAuthInitialized,
  setRefreshToken,
  setUsername,
} from '@/store/features/authSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';
    const username = localStorage.getItem('username') || '';

    if (access) dispatch(setAccessToken(access));
    if (refresh) dispatch(setRefreshToken(refresh));
    if (username) dispatch(setUsername(username));
    dispatch(setAuthInitialized());
  }, [dispatch]);
};
