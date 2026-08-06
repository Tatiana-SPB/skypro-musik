'use client';
import Link from 'next/link';
import styles from './bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setIsVolume,
  setNextTrack,
  setPrevTrack,
  toggleLoop,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helper';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const volume = useAppSelector((state) => state.tracks.isVolume);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const isLoop = useAppSelector((state) => state.tracks.isLoop);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isTimeDisplay, setTimeDisplay] = useState<string>('');
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setIsLoadedTrack(false);
    setCurrentTime(0);
    setTimeDisplay('');
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      console.log(audioRef.current.volume);
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }

    const handlePlay = () => dispatch(setIsPlay(true));
    const handlePause = () => dispatch(setIsPlay(false));

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentTrack, isPlaying, dispatch]);

  if (!currentTrack) return <></>;

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    const timeStr = getTimePanel(audio.currentTime, audio.duration);
    setTimeDisplay(timeStr);
  };

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      audio.play().catch(() => {});
      dispatch(setIsPlay(true));
      setIsLoadedTrack(true);
    }
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVolume(Number(e.target.value));
    if (audioRef.current)
      audioRef.current.volume = Number(e.target.value) / 100;
  };

  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(e.target.value));
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
    }
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const onToggleLoop = () => {
    dispatch(toggleLoop());
  };

  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <audio
          ref={audioRef}
          src={currentTrack?.track_file}
          className={styles.audioControls}
          onTimeUpdate={onTimeUpdate}
          loop={isLoop}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onNextTrack}
        ></audio>
        <ProgressBar
          max={currentTrack.duration_in_seconds || 0}
          value={currentTime}
          step={0.1}
          onChange={onChangeProgress}
          disabled={!isLoadedTrack}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={onPrevTrack} className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use href="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              {isPlaying ? (
                <div
                  onClick={pauseTrack}
                  className={classNames(styles.player__btnPlay, styles.btn)}
                >
                  <svg
                    width="15"
                    height="19"
                    viewBox="0 0 15 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="5" height="19" fill="#D9D9D9" />
                    <rect x="10" width="5" height="19" fill="#D9D9D9" />
                  </svg>
                </div>
              ) : (
                <div
                  onClick={playTrack}
                  className={classNames(styles.player__btnPlay, styles.btn)}
                >
                  <svg className={styles.player__btnPlaySvg}>
                    <use href="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </div>
              )}
              <div onClick={onNextTrack} className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use href="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                onClick={onToggleLoop}
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
              >
                {isLoop ? (
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 2.88672L4.5 -3.26633e-05V5.77347L9.5 2.88672ZM6.5 14.3867C3.46243 14.3867 1 11.9243 1 8.88672H0C0 12.4766 2.91015 15.3867 6.5 15.3867V14.3867ZM1 8.88672C1 5.84915 3.46243 3.38672 6.5 3.38672V2.38672C2.91015 2.38672 0 5.29687 0 8.88672H1Z"
                      fill="white"
                    />
                    <path
                      d="M9.5 14.8867L14.5 17.7735V12L9.5 14.8867ZM12.5 3.38672C15.5376 3.38672 18 5.84915 18 8.88672H19C19 5.29687 16.0899 2.38672 12.5 2.38672V3.38672ZM18 8.88672C18 11.9243 15.5376 14.3867 12.5 14.3867V15.3867C16.0899 15.3867 19 12.4766 19 8.88672H18Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg className={styles.player__btnRepeatSvg}>
                    <use href="/img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                )}
              </div>

              <div
                onClick={onToggleShuffle}
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
              >
                {isShuffle ? (
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 14.8867L14 12V17.7735L19 14.8867ZM9.66317 11.97L9.20863 12.1783L9.66317 11.97ZM6.83683 5.80345L6.3823 6.01177L6.83683 5.80345ZM0 3.38672H2.29151V2.38672H0V3.38672ZM6.3823 6.01177L9.20863 12.1783L10.1177 11.7617L7.29137 5.59512L6.3823 6.01177ZM14.2085 15.3867H14.5V14.3867H14.2085V15.3867ZM9.20863 12.1783C10.1047 14.1333 12.0579 15.3867 14.2085 15.3867V14.3867C12.449 14.3867 10.8508 13.3612 10.1177 11.7617L9.20863 12.1783ZM2.29151 3.38672C4.05105 3.38672 5.64918 4.41224 6.3823 6.01177L7.29137 5.59512C6.39533 3.64013 4.44205 2.38672 2.29151 2.38672V3.38672Z"
                      fill="white"
                    />
                    <path
                      d="M19 2.88672L14 5.77347V-3.24249e-05L19 2.88672ZM9.66317 5.80344L9.20863 5.59512L9.66317 5.80344ZM6.83683 11.97L6.3823 11.7617L6.83683 11.97ZM0 14.3867H2.29151V15.3867H0V14.3867ZM6.3823 11.7617L9.20863 5.59512L10.1177 6.01177L7.29137 12.1783L6.3823 11.7617ZM14.2085 2.38672H14.5V3.38672H14.2085V2.38672ZM9.20863 5.59512C10.1047 3.64013 12.0579 2.38672 14.2085 2.38672V3.38672C12.449 3.38672 10.8508 4.41224 10.1177 6.01177L9.20863 5.59512ZM2.29151 14.3867C4.05105 14.3867 5.64918 13.3612 6.3823 11.7617L7.29137 12.1783C6.39533 14.1333 4.44205 15.3867 2.29151 15.3867V14.3867Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg className={styles.player__btnShuffleSvg}>
                    <use href="/img/icon/sprite.svg#icon-shuffle"></use>
                  </svg>
                )}
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use href="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack?.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack?.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use href="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use href="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use href="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={onVolume}
                />
              </div>
            </div>
          </div>
          <span className={styles.bar__trackTime_totalTime}>
            {isTimeDisplay}
          </span>
        </div>
      </div>
    </div>
  );
}
