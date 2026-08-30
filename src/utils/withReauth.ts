import { refreshToken } from '@/services/auth/authApi';
import { setAccessToken } from '@/store/features/authSlice';
import { AppDispatch } from '@/store/store';
import { AxiosError } from 'axios';

let isRefreshing = false;

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  currentToken: string | null | undefined,
  refreshTokenStr: string,
  dispatch: AppDispatch,
): Promise<T> => {
  if (!currentToken) {
    throw new Error('No access token available');
  }

  try {
    return await apiFunction(currentToken);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      if (isRefreshing) {
        throw error;
      }

      isRefreshing = true;

      try {
        const newTokens = await refreshToken(refreshTokenStr);

        dispatch(setAccessToken(newTokens.access));

        return await apiFunction(newTokens.access);
      } catch (refreshError) {
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }
    throw error;
  }
};
