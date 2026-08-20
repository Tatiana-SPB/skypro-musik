import { initialStateType } from '@/store/features/trackSlice';
import { applyFilters } from './applyFilters';
import { data as mockTracks } from '@/data';

const createState = (
  overrides?: Partial<initialStateType>,
): initialStateType => ({
  pagePlaylist: [...mockTracks],
  filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
  },
  search: '',
  currentTrack: null,
  isPlay: false,
  isVolume: 0.1,
  playlist: [],
  isShuffle: false,
  shuffledPlaylist: [],
  isLoop: false,
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: false,
  filteredTracks: [],
  ...overrides,
});

describe('applyFilters', () => {
  it('возвращает все треки, если фильтры не активны', () => {
    const state = createState();
    const result = applyFilters(state);

    expect(result).toHaveLength(mockTracks.length);
    expect(result).not.toBe(state.pagePlaylist);
  });

  it('фильтрует по автору', () => {
    const state = createState({
      filters: {
        authors: ['Alexander Nakarada'],
        genres: [],
        years: 'По умолчанию',
      },
      search: '',
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Chase');
  });

  it('фильтрует по нескольким авторам', () => {
    const state = createState({
      filters: {
        authors: ['Alexander Nakarada', '-'],
        genres: [],
        years: 'По умолчанию',
      },
      search: '',
    });

    const result = applyFilters(state);
    expect(result.map((t) => t.name)).toContain('Chase');
    expect(result.map((t) => t.name)).toContain('Epic Heroic Conquest');
    expect(result.map((t) => t.name)).toContain('True Summer');
  });

  it('фильтрует по жанру', () => {
    const state = createState({
      filters: {
        authors: [],
        genres: ['Электронная музыка'],
        years: 'По умолчанию',
      },
      search: '',
    });

    const result = applyFilters(state);
    expect(result.map((t) => t.name)).toContain('Epic Heroic Conquest');
  });

  it('регистронезависимый поиск', () => {
    const state = createState({
      filters: { authors: [], genres: [], years: 'По умолчанию' },
      search: 'secret',
    });

    const result = applyFilters(state);
    expect(result.map((t) => t.name)).toContain('Secret Garden');
  });

  it('применяет все фильтры одновременно', () => {
    const state = createState({
      filters: {
        authors: ['-'],
        genres: ['Электронная музыка'],
        years: 'По умолчанию',
      },
      search: '',
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Epic Heroic Conquest');
  });

  it('корректно обрабатывает пустой плейлист', () => {
    const state: initialStateType = {
      currentTrack: null,
      isPlay: false,
      isVolume: 0.1,
      playlist: [],
      isShuffle: false,
      shuffledPlaylist: [],
      isLoop: false,
      allTracks: [],
      favoriteTracks: [],
      fetchError: null,
      fetchIsLoading: false,
      pagePlaylist: [],
      filteredTracks: [],
      filters: { authors: [], genres: [], years: 'По умолчанию' },
      search: '',
    };

    const result = applyFilters(state);
    expect(result).toEqual([]);
  });
});
