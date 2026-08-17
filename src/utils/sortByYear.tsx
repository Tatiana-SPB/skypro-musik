import { TrackType } from '@/sharedTypes/sharedTypes';

export const sortByYear = (
  tracks: TrackType[],
  option: 'По умолчанию' | 'Сначала новые' | 'Сначала старые',
) => {
  if (option === 'По умолчанию') {
    return [...tracks];
  }

  return [...tracks].sort((a, b) => {
    const yearA = a.release_date
      ? parseInt(a.release_date.split('-')[0], 10)
      : 0;
    const yearB = b.release_date
      ? parseInt(b.release_date.split('-')[0], 10)
      : 0;

    if (option === 'Сначала новые') {
      return yearB - yearA;
    } else {
      return yearA - yearB;
    }
  });
};
