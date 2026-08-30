import { sortByYear } from './sortByYear';
import { TrackType } from '@/sharedTypes/sharedTypes';

const mockTracks: TrackType[] = [
  {
    _id: 8,
    name: 'Chase',
    author: 'Alexander Nakarada',
    genre: ['Классическая музыка'],
    release_date: '2005-06-11',
    duration_in_seconds: 128,
    album: 'Chase',
    logo: null,
    track_file: 'url-1',
    stared_user: [],
  },
  {
    _id: 9,
    name: 'Open Sea epic',
    author: 'Frank Schroter',
    genre: ['Классическая музыка'],
    release_date: '2019-06-12',
    duration_in_seconds: 141,
    album: 'Open Sea epic',
    logo: null,
    track_file: 'url-2',
    stared_user: [],
  },
  {
    _id: 10,
    name: 'Sneaky Snitch',
    author: 'Kevin Macleod',
    genre: ['Классическая музыка'],
    release_date: '2022-04-16',
    duration_in_seconds: 136,
    album: 'Sneaky Snitch',
    logo: null,
    track_file: 'url-3',
    stared_user: [],
  },
  {
    _id: 11,
    name: 'Secret Garden',
    author: 'Mixkit',
    genre: ['Классическая музыка'],
    release_date: '1972-06-06',
    duration_in_seconds: 143,
    album: 'Secret Garden',
    logo: null,
    track_file: 'url-4',
    stared_user: [],
  },
  {
    _id: 999,
    name: 'No Date Track',
    author: 'Unknown',
    genre: ['Unknown'],
    release_date: '',
    duration_in_seconds: 100,
    album: '',
    logo: null,
    track_file: '',
    stared_user: [],
  },
  {
    _id: 998,
    name: 'Null Date Track',
    author: 'Unknown',
    genre: ['Unknown'],
    release_date: '',
    duration_in_seconds: 100,
    album: '',
    logo: null,
    track_file: '',
    stared_user: [],
  },
];

describe('sortByYear', () => {
  it('возвращает копию массива без изменений при опции "По умолчанию"', () => {
    const result = sortByYear(mockTracks, 'По умолчанию');

    expect(result).not.toBe(mockTracks);

    const expectedNames = mockTracks.map((t) => t.name);
    expect(result.map((t) => t.name)).toEqual(expectedNames);
  });

  it('сортирует по убыванию года ("Сначала новые")', () => {
    const result = sortByYear(mockTracks, 'Сначала новые');
    const names = result.map((t) => t.name);

    expect(names[0]).toBe('Sneaky Snitch'); // 2022
    expect(names[1]).toBe('Open Sea epic'); // 2019
    expect(names[2]).toBe('Chase'); // 2005
    expect(names[3]).toBe('Secret Garden'); // 1972

    const lastTwo = names.slice(-2);
    expect(lastTwo).toContain('No Date Track');
    expect(lastTwo).toContain('Null Date Track');
  });

  it('сортирует по возрастанию года ("Сначала старые")', () => {
    const result = sortByYear(mockTracks, 'Сначала старые');
    const names = result.map((t) => t.name);

    expect(names[0]).toBe('Secret Garden'); // 1972
    expect(names[1]).toBe('Chase'); // 2005
    expect(names[2]).toBe('Open Sea epic'); // 2019
    expect(names[3]).toBe('Sneaky Snitch'); // 2022

    const lastTwo = names.slice(-2);
    expect(lastTwo).toContain('No Date Track');
    expect(lastTwo).toContain('Null Date Track');
  });

  it('корректно обрабатывает треки без даты, считая их годом 0', () => {
    const resultNew = sortByYear(mockTracks, 'Сначала новые');
    const topThreeNames = resultNew.slice(0, 3).map((t) => t.name);

    expect(topThreeNames).not.toContain('No Date Track');
    expect(topThreeNames).not.toContain('Null Date Track');
  });

  it('не мутирует исходный массив', () => {
    const originalIds = mockTracks.map((t) => t._id);

    sortByYear(mockTracks, 'Сначала новые');
    sortByYear(mockTracks, 'Сначала старые');
    sortByYear(mockTracks, 'По умолчанию');

    expect(mockTracks.map((t) => t._id)).toEqual(originalIds);
  });
});
