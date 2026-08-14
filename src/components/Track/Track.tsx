'use client';

import { formatTime } from '@/utils/helper';
import styles from './track.module.css';
import Link from 'next/link';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlay,
} from '@/store/features/trackSlice';
import { useLikeTrack } from '@/hooks/useLikeTrack';

interface TrackTypeProps {
  track: TrackType;
  playlist: TrackType[];
}

export default function Track({ track, playlist }: TrackTypeProps) {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const { toggleLike, isLike, isLoading: likeLoading } = useLikeTrack(track);

  const onClickTrack = () => {
    if (currentTrack && currentTrack._id === track._id) {
      dispatch(setIsPlay(!isPlaying));
      return;
    }

    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
    dispatch(setCurrentPlaylist(playlist));
  };

  const isActive = !!currentTrack && currentTrack._id === track._id;
  const isPlayingTrack = isActive && isPlaying;

  return (
    <div className={styles.playlist__item} onClick={onClickTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isActive ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isPlayingTrack ? styles.track__titleSvg_pulse : ''}
              >
                <path
                  d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
                  fill="#B672FF"
                />
              </svg>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div>
            <Link className={styles.track__titleLink} href="">
              {track.name}
              <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div>
          <svg
            className={`${styles.track__timeSvg} ${likeLoading ? 'opacity-50' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
          >
            <use
              xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-like' : 'icon-dislike'}`}
            ></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
