'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getTracksSort } from '@/services/tracks/tracksApi';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Centerblock from '@/components/Centerblock/Centerblock';
import { resetFilters, setPagePlaylist } from '@/store/features/trackSlice';

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const { fetchIsLoading, allTracks, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);

  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    dispatch(resetFilters());
  }, [id, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    if (!fetchIsLoading && allTracks.length) {
      getTracksSort(id)
        .then((res) => {
          setTitle(res.name);
          const tracksIds = res.items;
          const resultTracks = allTracks.filter((el) =>
            tracksIds.includes(el._id),
          );
          dispatch(setPagePlaylist(resultTracks));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setErrorRes(error.response.data);
            } else {
              if (error.request) {
                setErrorRes('Что-то с интернетом');
              } else {
                setErrorRes('Неизвестная ошибка');
              }
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, allTracks, fetchIsLoading, dispatch]);

  const displayTracks = useAppSelector((state) => state.tracks.filteredTracks);

  return (
    <>
      <Centerblock
        tracks={displayTracks}
        errorRes={errorRes || fetchError}
        isLoading={isLoading}
        title={title}
        pagePlaylist={allTracks}
      />
    </>
  );
}
