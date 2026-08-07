'use client';
import { getUniqueValuesByKey } from '@/utils/helper';
import styles from './filter.module.css';
import { data } from '@/data';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getTracks } from '@/servises/tracks/tracksApi';
import { AxiosError } from 'axios';

export default function Filter() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeFilter, setActiveFilter] = useState<
    'authors' | 'year' | 'genre' | null
  >(null);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<
    'default' | 'new-to-old' | 'old-to-new'
  >('default');

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

  const toggleFilter = (filterId: typeof activeFilter) => {
    setActiveFilter((prev) => (prev === filterId ? null : filterId));
  };

  const isOpen = (filterId: typeof activeFilter) => activeFilter === filterId;

  const handleAuthorToggle = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author],
    );
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const renderBadge = (count: number) => {
    if (count === 0) return null;
    return <span className={styles.filter__badge}>{count}</span>;
  };

  const uniqueAuthors = getUniqueValuesByKey(tracks, 'author') as string[];
  const uniqueGenres = getUniqueValuesByKey(tracks, 'genre') as string[];

  const PopFilterAuthors = () => {
    return (
      <ul className={styles.filter__authorsList}>
        {uniqueAuthors.map((author) => {
          const isSelected = selectedAuthors.includes(author);
          return (
            <li
              key={author}
              className={`${styles.filter__itemList} ${isSelected ? styles.filter__itemSelected : ''}`}
              onClick={() => handleAuthorToggle(author)}
            >
              {author}
            </li>
          );
        })}
      </ul>
    );
  };

  const PopFilterGenre = () => {
    return (
      <ul className={styles.filter__authorsList}>
        {uniqueGenres.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <li
              key={genre}
              className={`${styles.filter__itemList} ${isSelected ? styles.filter__itemSelected : ''}`}
              onClick={() => handleGenreToggle(genre)}
            >
              {genre}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <div className={styles.filterWrapper}>
        <div
          onClick={() => toggleFilter('authors')}
          className={`${styles.filter__button} ${isOpen('authors') ? styles.filter__buttonActive : ''}`}
        >
          исполнителю
        </div>
        {renderBadge(selectedAuthors.length)}
        <div
          className={`${isOpen('authors') ? styles.filter__list : styles.filter__close}`}
        >
          {PopFilterAuthors()}
        </div>
      </div>

      <div className={styles.filterWrapper}>
        <div
          onClick={() => toggleFilter('year')}
          className={`${styles.filter__button} ${isOpen('year') ? styles.filter__buttonActive : ''}`}
        >
          году выпуска
        </div>
        <div
          className={`${isOpen('year') ? styles.filter__list : styles.filter__close}`}
        >
          <ul className={styles.filter__authorsList}>
            <li
              className={`${styles.filter__itemList} ${sortOption === 'default' ? styles.filter__itemSelected : ''}`}
              onClick={() => setSortOption('default')}
            >
              По умолчанию
            </li>
            <li
              className={`${styles.filter__itemList} ${sortOption === 'new-to-old' ? styles.filter__itemSelected : ''}`}
              onClick={() => setSortOption('new-to-old')}
            >
              Сначала новые
            </li>
            <li
              className={`${styles.filter__itemList} ${sortOption === 'old-to-new' ? styles.filter__itemSelected : ''}`}
              onClick={() => setSortOption('old-to-new')}
            >
              Сначала старые
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.filterWrapper}>
        <div
          onClick={() => toggleFilter('genre')}
          className={`${styles.filter__button} ${isOpen('genre') ? styles.filter__buttonActive : ''}`}
        >
          жанру
        </div>
        {renderBadge(selectedGenres.length)}

        <div
          className={`${isOpen('genre') ? styles.filter__list : styles.filter__close}`}
        >
          {PopFilterGenre()}
        </div>
      </div>
    </div>
  );
}
