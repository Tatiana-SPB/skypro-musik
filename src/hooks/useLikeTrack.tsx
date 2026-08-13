import { addLike, removeLike } from '@/servises/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReauth';
import { useState } from 'react';

export interface ReturnTypeHook {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
}

export const useLikeTrack = (track: TrackType | null): ReturnTypeHook => {
  // favoriteTracks берем из стора, но помним, что он может быть пустым, если загрузка не прошла
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Локальное состояние "нравится ли" считаем на основе текущего массива в сторе
  const isLike = !!track && favoriteTracks.some((t) => t._id === track._id);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (!track) return;
    if (!access) {
      setErrorMsg('Нет авторизации');
      return;
    }

    const actionApi = isLike ? removeLike : addLike;
    // Мы НЕ делаем dispatch сразу! Ждем ответа сервера

    setIsLoading(true);
    setErrorMsg(null);

    withReauth(
      (newToken) => actionApi(newToken || access, track._id),
      access,
      refresh,
      dispatch,
    )
      .then(() => {
        // ✅ ТОЛЬКО ПОСЛЕ УСПЕХА обновляем Redux
        if (isLike) {
          const idToRemove =
            typeof track._id === 'string' ? track._id : track._id.toString();
          dispatch(removeLikedTracks(idToRemove));
        } else {
          dispatch(addLikedTracks(track));
        }
      })
      .catch((error) => {
        setErrorMsg('Не удалось изменить статус лайка');
        console.error(error);
        // Здесь НЕ обновляем Redux, оставляем как было
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
