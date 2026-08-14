'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { getTracksSort } from '@/servises/tracks/tracksApi';
import { useAppSelector } from '@/store/store';
import Centerblock from '@/components/Centerblock/Centerblock';

export default function CategoryPage() {
  const { fetchIsLoading, allTracks, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [tracks, setTracksSort] = useState<TrackType[]>([]);

  const params = useParams<{ id: string }>();
  const id = params.id;

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
          setTracksSort(resultTracks);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              //запрос был сделан, и сервер ответил состоянием не 200, здесь обработать 400-е ошибки
              setErrorRes(error.response.data);
            } else {
              if (error.request) {
                console.log(error.request);
                setErrorRes('Что-то с интернетом');
                //запрос был сделан, но ответа не получено, здесь обработать ситуацию нет интернета
              } else {
                console.log(error.message);
                //что-то произошло вызвавшее ошибку
                setErrorRes('Неизвестная ошибка');
              }
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, allTracks, fetchIsLoading]);

  return (
    <>
      <Centerblock
        tracks={tracks}
        errorRes={errorRes || fetchError}
        isLoading={isLoading}
        title={title}
      />
    </>
  );
}
