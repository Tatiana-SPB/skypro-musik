'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getTracksFavoriteRaw } from '@/services/tracks/tracksApi';
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

  const authState = useAppSelector((state) => state.auth);
  const access = authState?.access;
  const refresh = authState?.refresh;
  const isInitialized = authState.isInitialized;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInitialized) return;
    if (!refresh) {
      dispatch(setFavoriteTracks([]));
      dispatch(setFetchIsLoading(false));
      return;
    }

    const loadFavoriteTracks = async () => {
      dispatch(setFetchIsLoading(true));
      try {
        const tracks = await withReauth(
          (token) => getTracksFavoriteRaw(token),
          access,
          refresh,
          dispatch,
        );

        dispatch(setFavoriteTracks(tracks));
        dispatch(setFetchError(null));
      } catch (e) {
        console.error('Ошибка загрузки избранного:', e);
        dispatch(setFavoriteTracks([]));
        dispatch(setFetchError('Не удалось загрузить избранные треки'));
      } finally {
        dispatch(setFetchIsLoading(false));
      }
    };

    loadFavoriteTracks();
  }, [dispatch, access, refresh, isInitialized]);

  return (
    <Centerblock
      tracks={favoriteTracks}
      errorRes={fetchError}
      isLoading={fetchIsLoading}
      title={'Мои треки'}
    />
  );
}
