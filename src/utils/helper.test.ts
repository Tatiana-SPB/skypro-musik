import { formatTime, getTimePanel, getUniqueValuesByKey } from './helper';
import { data as mockTracks } from '@/data';

describe('formatTime', () => {
  it('Добавляет нуль, если секунд < 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
  it('Форматирует время < 1 минуты', () => {
    expect(formatTime(30)).toBe('0:30');
  });
  it('Обрабатывает 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});

describe('getTimePanel', () => {
  it('возвращает текущее время, если длина трека (undefined)', () => {
    const result = getTimePanel(123, undefined);
    expect(result).toBe(formatTime(123));
  });
  it('возвращает текущее время, если длина трека равна 0', () => {
    const result = getTimePanel(45, 0);
    expect(result).toBe(formatTime(45));
  });
});

describe('getUniqueValuesByKey', () => {
  it('возвращает уникальных авторов (строки), считая "-" обычным значением', () => {
    const result = getUniqueValuesByKey(mockTracks, 'author');

    expect(result).toHaveLength(6);
    expect(result).toContain('-');
  });

  it('корректно извлекает жанры из массивов и убирает дубликаты', () => {
    const result = getUniqueValuesByKey(mockTracks, 'genre');

    expect(result).toEqual(['Классическая музыка', 'Электронная музыка']);
  });

  it('работает с пустым массивом входных данных', () => {
    const result = getUniqueValuesByKey([], 'author');
    expect(result).toEqual([]);
  });

  it('гарантирует уникальность результата (нет дублей)', () => {
    const result = getUniqueValuesByKey(mockTracks, 'album');
    const set = new Set(result);
    expect(set.size).toBe(result.length);
  });
});
