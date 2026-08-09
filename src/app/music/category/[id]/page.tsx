'use client';
import Filter from '@/components/Filter/Filter';
import Search from '@/components/Search/Search';
import Track from '@/components/Track/Track';
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { getTracksSort } from '@/servises/tracks/tracksApi';

const CATEGORY_TITLES: Record<string, string> = {
  '2': 'Плейлист дня',
  '3': '100 танцевальных хитов',
  '4': 'Инди заряд',
};

export default function CategoryPage() {
  const [tracks, setTracksSort] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const { id } = useParams<{ id: string }>()!;
  const title = CATEGORY_TITLES[id] ?? id;

  useEffect(() => {
    getTracksSort(id)
      .then((res) => {
        setTracksSort(res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            //запрос был сделан, и сервер ответил состоянием не 200, здесь обработать 400-е ошибки
            setError(error.response.data);
          } else {
            if (error.request) {
              console.log(error.request);
              setError('Что-то с интернетом');
              //запрос был сделан, но ответа не получено, здесь обработать ситуацию нет интернета
            } else {
              console.log(error.message);
              //что-то произошло вызвавшее ошибку
              setError('Неизвестная ошибка');
            }
          }
        }
      });
  }, [id]);

  return (
    <>
      <div className={styles.centerblock}>
        <Search />
        <h2 className={styles.centerblock__h2}>{title}</h2>
        <Filter tracks={tracks} />
        {error}
        <div className={styles.centerblock__content}>
          <div className={styles.content__title}>
            <div
              className={classNames(styles.playlistTitle__col, styles.col01)}
            >
              Трек
            </div>
            <div
              className={classNames(styles.playlistTitle__col, styles.col02)}
            >
              Исполнитель
            </div>
            <div
              className={classNames(styles.playlistTitle__col, styles.col03)}
            >
              Альбом
            </div>
            <div
              className={classNames(styles.playlistTitle__col, styles.col04)}
            >
              <svg className={styles.playlistTitle__svg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
              </svg>
            </div>
          </div>
          <div className={styles.content__playlist}>
            {tracks.map((track) => (
              <Track key={track._id} track={track} playlist={tracks} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
