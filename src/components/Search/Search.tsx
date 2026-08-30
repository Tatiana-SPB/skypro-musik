'use client';

import styles from './search.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSearch } from '@/store/features/trackSlice';

export default function Search() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.tracks);

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearch(value));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={search}
        onChange={onSearchInput}
      />
    </div>
  );
}
