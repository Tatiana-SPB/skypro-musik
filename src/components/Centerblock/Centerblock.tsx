'use client';
import styles from './centerblock.module.css';
import classNames from 'classnames';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '@/components/Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { setPagePlaylist } from '@/store/features/trackSlice';

type CenterblockProp = {
  tracks: TrackType[];
  isLoading: boolean;
  errorRes: string | null;
  title: string;
  pagePlaylist: TrackType[];
};

export default function Centerblock({
  tracks,
  isLoading,
  errorRes,
  title,
  pagePlaylist,
}: CenterblockProp) {
  const dispatch = useAppDispatch();
  const filteredTracks = useAppSelector((state) => state.tracks.filteredTracks);

  useEffect(() => {
    if (!isLoading && !errorRes) {
      dispatch(setPagePlaylist(pagePlaylist));
    }
  }, [isLoading, errorRes, pagePlaylist]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={pagePlaylist} />
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
          {errorRes ? (
            <p className={styles.error_message}>{errorRes}</p>
          ) : isLoading ? (
            <div className={styles.loading_state}>
              <p>Загрузка треков...</p>
              <div className={styles.spinner}></div>
            </div>
          ) : (
            filteredTracks.map((track) => (
              <Track key={track._id} track={track} playlist={filteredTracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
