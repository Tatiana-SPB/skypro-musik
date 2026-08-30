import { addLike, removeLike } from '@/services/tracks/tracksApi';
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
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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

    setIsLoading(true);
    setErrorMsg(null);

    withReauth(
      (newToken) => actionApi(newToken || access, track._id),
      access,
      refresh,
      dispatch,
    )
      .then(() => {
        if (isLike) {
          dispatch(removeLikedTracks(track._id));
        } else {
          dispatch(addLikedTracks(track));
        }
      })
      .catch((error) => {
        setErrorMsg('Не удалось изменить статус лайка');
        console.error(error);
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
