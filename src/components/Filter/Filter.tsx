'use client';
import { getUniqueValuesByKey } from '@/utils/helper';
import styles from './filter.module.css';
import { data } from '@/data';
import { useState } from 'react';

export default function Filter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const PopFilterAuthors = () => {
    const uniqueAuthors = getUniqueValuesByKey(data, 'author') as string[];

    return uniqueAuthors.length > 0 ? (
      <ul className={styles.filter__authorsList}>
        {uniqueAuthors.map((author) => (
          <li className={styles.filter__itemList} key={author}>
            {author}
          </li>
        ))}
      </ul>
    ) : (
      <ul>Список пуст</ul>
    );
  };

  const PopFilterGenre = () => {
    const uniqueGenre = getUniqueValuesByKey(data, 'genre') as string[];

    return uniqueGenre.length > 0 ? (
      <ul className={styles.filter__authorsList}>
        {uniqueGenre.map((genre) => (
          <li className={styles.filter__itemList} key={genre}>
            {genre}
          </li>
        ))}
      </ul>
    ) : (
      <ul>Список пуст</ul>
    );
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div className={styles.filterWrapper}>
        <div onClick={toggleFilter} className={styles.filter__button}>
          исполнителю
        </div>
        <div
          className={`${isFilterOpen ? styles.filter__list : styles.filter__close}`}
        >
          {PopFilterAuthors()}
        </div>
      </div>
      <div className={styles.filterWrapper}>
        <div onClick={toggleFilter} className={styles.filter__button}>
          году выпуска
        </div>
        <div
          className={`${isFilterOpen ? styles.filter__list : styles.filter__close}`}
        >
          <ul className={styles.filter__authorsList}>
            <li className={styles.filter__itemList}>По умолчанию</li>
            <li className={styles.filter__itemList}>Сначала новые</li>
            <li className={styles.filter__itemList}>Сначала старые</li>
          </ul>
        </div>
      </div>
      <div className={styles.filterWrapper}>
        <div onClick={toggleFilter} className={styles.filter__button}>
          жанру
        </div>
        <div
          className={`${isFilterOpen ? styles.filter__list : styles.filter__close}`}
        >
          {PopFilterGenre()}
        </div>
      </div>
    </div>
  );
}
