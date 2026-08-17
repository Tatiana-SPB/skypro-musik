import { TrackType } from '@/sharedTypes/sharedTypes';
import { applyFilters } from '@/utils/applyFilters';
import { sortByYear } from '@/utils/sortByYear';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isVolume: number;
  playlist: TrackType[];
  isShuffle: boolean;
  shuffledPlaylist: TrackType[];
  isLoop: boolean;
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  fetchError: string | null;
  fetchIsLoading: boolean;
  pagePlaylist: TrackType[];
  filteredTracks: TrackType[];
  filters: {
    authors: string[];
    genres: string[];
    years: 'По умолчанию' | 'Сначала новые' | 'Сначала старые';
  };
  search: string;
};

const initialState: initialStateType = {
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
  fetchIsLoading: true,
  pagePlaylist: [],
  filteredTracks: [],
  filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
  },
  search: '',
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    toggleLoop: (state) => {
      state.isLoop = !state.isLoop;
    },
    setIsVolume: (state, action: PayloadAction<number>) => {
      state.isVolume = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack!._id,
      );
      if (curIndex === -1 || curIndex + 1 >= playlist.length) return;

      const nextIndexTrack = curIndex + 1;
      state.currentTrack = playlist[nextIndexTrack];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack!._id,
      );
      if (curIndex <= 0) return;
      const prevtIndexTrack = curIndex - 1;
      state.currentTrack = playlist[prevtIndexTrack];
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      if (!state.favoriteTracks.some((t) => t._id === action.payload._id)) {
        state.favoriteTracks = [...state.favoriteTracks, action.payload];
      }
    },
    removeLikedTracks: (state, action: PayloadAction<string | number>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (t) => t._id !== action.payload,
      );
    },
    setFetchError: (state, action: PayloadAction<string | null>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setPagePlaylist: (state, action) => {
      state.pagePlaylist = action.payload;
      const filtered = applyFilters(state);
      state.filteredTracks = sortByYear(filtered, state.filters.years);
    },
    setFilteredTracks: (state, action) => {
      state.filteredTracks = action.payload;
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter((el) => {
          return el !== author;
        });
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }
      state.filteredTracks = applyFilters(state);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genres = action.payload;

      if (state.filters.genres.includes(genres)) {
        state.filters.genres = state.filters.genres.filter((el) => {
          return el !== genres;
        });
      } else {
        state.filters.genres = [...state.filters.genres, genres];
      }
      state.filteredTracks = applyFilters(state);
    },
    setFilterYears: (
      state,
      action: PayloadAction<
        'По умолчанию' | 'Сначала новые' | 'Сначала старые'
      >,
    ) => {
      const selectedYearOption = action.payload;
      state.filters.years = selectedYearOption;
      const filtered = applyFilters(state);
      state.filteredTracks = sortByYear(filtered, action.payload);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      const filtered = applyFilters(state);
      state.filteredTracks = sortByYear(filtered, state.filters.years);
    },
    clearSearch: (state) => {
      state.search = '';
      const filtered = applyFilters(state);
      state.filteredTracks = sortByYear(filtered, state.filters.years);
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setIsVolume,
  setCurrentPlaylist,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
  toggleLoop,
  setAllTracks,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFetchError,
  setFetchIsLoading,
  setPagePlaylist,
  setFilteredTracks,
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
  setSearch,
  clearSearch,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
