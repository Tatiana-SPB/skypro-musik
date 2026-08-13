'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getTracksFavoriteRaw } from '@/servises/tracks/tracksApi';
import {
  setFavoriteTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReauth';
import { useEffect } from 'react';

export default function FavoritePage() {
  const { fetchError, fetchIsLoading, favoriteTracks } = useAppSelector(
    (state) => state.tracks,
  );

  // Получаем токены. Если refresh нет - пользователь вообще не авторизован
  const authState = useAppSelector((state) => state.auth);
  const access = authState?.access;
  const refresh = authState?.refresh;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!refresh) {
      dispatch(setFetchError('Пользователь не авторизован'));
      dispatch(setFetchIsLoading(false));
      return;
    }

    const loadFavoriteTracks = async () => {
      dispatch(setFetchIsLoading(true));
      try {
        // Запрос через механизм реавторизации
        const tracks = await withReauth(
          (token) => getTracksFavoriteRaw(token),
          access,
          refresh,
          dispatch,
        );

        // Успех: обновляем треки и убираем ошибку
        dispatch(setFavoriteTracks(tracks));
        dispatch(setFetchError(null));
      } catch (e) {
        console.error('Ошибка загрузки избранного:', e);
        // ВАЖНО: При ошибке очищаем список, иначе будут висеть старые данные
        dispatch(setFavoriteTracks([]));
        dispatch(setFetchError('Не удалось загрузить избранные треки'));
      } finally {
        dispatch(setFetchIsLoading(false));
      }
    };

    loadFavoriteTracks();
  }, [dispatch, access, refresh]); // Зависимость от access нужна, чтобы перезапустить при обновлении токена

  return (
    <Centerblock
      tracks={favoriteTracks}
      errorRes={fetchError}
      isLoading={fetchIsLoading}
      title={'Мои треки'}
    />
  );
}
