import styles from './centerblock.module.css';
import classNames from 'classnames';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '@/components/Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';

type CenterblockProp = {
  tracks: TrackType[];
  isLoading: boolean;
  errorRes: string | null;
  title: string;
};

export default function Centerblock({
  tracks,
  isLoading,
  errorRes,
  title,
}: CenterblockProp) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
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
            tracks.map((track) => (
              <Track key={track._id} track={track} playlist={tracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
