'use client';
import classNames from 'classnames';
import { data } from '@/data';
import Track from '@/components/Track/Track';
import Search from '@/components/Search/Search';
import Filter from '@/components/Filter/Filter';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getTracks } from '@/servises/tracks/tracksApi';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
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
  }, []);

  console.log(tracks);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Мои треки</h2>
      <Filter />
      {error}
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
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
  );
}
