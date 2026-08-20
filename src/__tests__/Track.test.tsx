import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';
import { formatTime } from '@/utils/helper';
import { trackSliceReducer } from '@/store/features/trackSlice';
import { Provider } from 'react-redux';
import Track from '@/components/Track/Track';
import { authSliceReducer } from '@/store/features/authSlice';
import { configureStore } from '@reduxjs/toolkit';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

const createMockStore = (track: TrackType) => {
  return configureStore({
    reducer: {
      tracks: trackSliceReducer,
      auth: authSliceReducer,
    },
    preloadedState: {
      tracks: {
        currentTrack: track,
        isPlay: true,
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
          years: 'По умолчанию' as const,
        },
        search: '',
      },
      auth: {
        username: '',
        access: '',
        refresh: '',
        isInitialized: false,
      },
    },
  });
};

describe('Track Component', () => {
  test('Отрисовка данных трека', () => {
    const store = createMockStore(mockTrack);

    render(
      <Provider store={store}>
        <Track track={mockTrack} playlist={mockTracks} />
      </Provider>,
    );
    expect(screen.getByText(mockTrack.author)).toBeInTheDocument();
    expect(screen.getByText(mockTrack.name)).toBeInTheDocument();
  });
});
