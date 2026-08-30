'use client';
import { getUniqueValuesByKey } from '@/utils/helper';
import styles from './filter.module.css';
import { useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
} from '@/store/features/trackSlice';
import FilterItem from '../FilterItem/FilterItem';

interface FilterProp {
  tracks: TrackType[];
}

type YearOption = 'По умолчанию' | 'Сначала новые' | 'Сначала старые';

export default function Filter({ tracks }: FilterProp) {
  const dispatch = useAppDispatch();
  let { authors, genres, years } = useAppSelector(
    (state) => state.tracks.filters,
  );

  if (!tracks) {
    ((genres = []), (authors = []));
  }

  const [activeFilter, setActiveFilter] = useState<null | string>(null);

  const changeActiveFilter = (nameFilter: string) => {
    if (activeFilter === nameFilter) return setActiveFilter(null);
    setActiveFilter(nameFilter);
  };

  const uniqueAuthors = getUniqueValuesByKey(tracks, 'author') as string[];
  const uniqueGenres = getUniqueValuesByKey(tracks, 'genre') as string[];
  const yearsList: YearOption[] = [
    'По умолчанию',
    'Сначала новые',
    'Сначала старые',
  ];

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const onSelectGenres = (genre: string) => {
    dispatch(setFilterGenres(genre));
  };

  const onSelectYear = (year: YearOption) => {
    dispatch(setFilterYears(year));
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <FilterItem
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'author'}
        list={uniqueAuthors}
        titleFilter={'исполнителю'}
        onSelect={onSelectAuthor}
        selectedItems={authors}
        selectedCount={authors.length}
      />

      <FilterItem
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'year'}
        list={yearsList}
        titleFilter={'году выпуска'}
        onSelect={(val) => onSelectYear(val as YearOption)}
        selectedItems={[years]}
        selectedCount={0}
      />

      <FilterItem
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'genre'}
        list={uniqueGenres}
        titleFilter={'жанру'}
        onSelect={onSelectGenres}
        selectedItems={genres}
        selectedCount={genres.length}
      />
    </div>
  );
}
