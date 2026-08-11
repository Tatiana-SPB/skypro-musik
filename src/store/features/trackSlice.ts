import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isVolume: number;
  playlist: TrackType[];
  isShuffle: boolean;
  shuffledPlaylist: TrackType[];
  isLoop: boolean;
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
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
  fetchError: null,
  fetchIsLoading: true,
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

    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
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
  setFetchError,
  setFetchIsLoading,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
