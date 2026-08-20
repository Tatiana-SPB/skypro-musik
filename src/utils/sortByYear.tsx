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
      // Не возвращаем 0! Возвращаем null, чтобы отличать "нет данных" от "год 0"
      if (!date || typeof date !== 'string') return null;

      const yearStr = date.split('-')[0];
      const yearNum = parseInt(yearStr, 10);

      return isNaN(yearNum) ? null : yearNum;
    };

    const yearA = getYear(a.release_date);
    const yearB = getYear(b.release_date);

    // 1. Если у обоих треков нет даты, их порядок между собой не важен
    if (yearA === null && yearB === null) return 0;

    // 2. Если у первого трека нет даты, а у второго есть -> первый должен быть ПОСЛЕ второго
    if (yearA === null) return 1;

    // 3. Если у второго трека нет даты, а у первого есть -> второй должен быть ПОСЛЕ первого
    if (yearB === null) return -1;

    // Дальше сортируем только валидные годы
    if (option === 'Сначала новые') {
      return yearB - yearA;
    } else {
      return yearA - yearB;
    }
  });
};
