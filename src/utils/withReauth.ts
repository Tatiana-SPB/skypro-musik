import { refreshToken } from '@/servises/auth/authApi';
import { setAccessToken } from '@/store/features/authSlice';
import { AppDispatch } from '@/store/store';
import { AxiosError } from 'axios';

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  currentToken: string | null | undefined,
  refreshTokenStr: string,
  dispatch: AppDispatch,
): Promise<T> => {
  let tokenToUse = currentToken || '';

  try {
    // 1. Пытаемся сделать запрос с текущим токеном
    return await apiFunction(tokenToUse);
  } catch (error) {
    const axiosError = error as AxiosError;

    // 2. Если ошибка 401 - пробуем обновить токен
    if (axiosError.response?.status === 401) {
      try {
        const newTokens = await refreshToken(refreshTokenStr);

        // Сохраняем новый access токен в Redux
        dispatch(setAccessToken(newTokens.access));

        // 3. Повторяем запрос с НОВЫМ токеном
        return await apiFunction(newTokens.access);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    throw error;
  }
};
