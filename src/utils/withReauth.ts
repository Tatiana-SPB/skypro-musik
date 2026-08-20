import { refreshToken } from '@/services/auth/authApi';
import { setAccessToken } from '@/store/features/authSlice';
import { AppDispatch } from '@/store/store';
import { AxiosError } from 'axios';

// Флаг, чтобы не обновлять токен параллельно из разных запросов
let isRefreshing = false;

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  currentToken: string | null | undefined,
  refreshTokenStr: string,
  dispatch: AppDispatch,
): Promise<T> => {
  // Если токена вообще нет, не пытаемся делать запрос с пустой строкой
  if (!currentToken) {
    throw new Error('No access token available');
  }

  try {
    // 1. Пытаемся сделать запрос с текущим токеном
    return await apiFunction(currentToken);
  } catch (error) {
    const axiosError = error as AxiosError;

    // Проверяем, действительно ли это ошибка Axios и статус 401
    if (axiosError.response?.status === 401) {
      // Защита от параллельных запросов на обновление
      if (isRefreshing) {
        // Ждем, пока текущий процесс обновления завершится
        // В реальном проекте тут нужна очередь или Promise.race
        throw error;
      }

      isRefreshing = true;

      try {
        const newTokens = await refreshToken(refreshTokenStr);

        // Сохраняем новый access токен в Redux
        dispatch(setAccessToken(newTokens.access));

        // 3. Повторяем запрос с НОВЫМ токеном
        // Важно: используем newTokens.access, а не глобальную переменную,
        // так как dispatch асинхронен и может еще не примениться в сторе
        return await apiFunction(newTokens.access);
      } catch (refreshError) {
        // Если обновление не удалось (refresh token тоже истек),
        // нужно очистить стор и перенаправить на логин.
        // Для теста просто пробрасываем ошибку.
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    // Если это не 401, просто пробрасываем ошибку дальше
    throw error;
  }
};
