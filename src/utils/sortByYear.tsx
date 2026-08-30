import { TrackType } from '@/sharedTypes/sharedTypes';

export const sortByYear = (
  tracks: TrackType[],
  option: 'По умолчанию' | 'Сначала новые' | 'Сначала старые',
) => {
  if (option === 'По умолчанию') {
    return [...tracks];
  }

  return [...tracks].sort((a, b) => {
    const getYear = (date: string | null | undefined) => {
      if (!date || typeof date !== 'string') return null;

      const yearStr = date.split('-')[0];
      const yearNum = parseInt(yearStr, 10);

      return isNaN(yearNum) ? null : yearNum;
    };

    const yearA = getYear(a.release_date);
    const yearB = getYear(b.release_date);

    if (yearA === null && yearB === null) return 0;

    if (yearA === null) return 1;

    if (yearB === null) return -1;

    if (option === 'Сначала новые') {
      return yearB - yearA;
    } else {
      return yearA - yearB;
    }
  });
};
