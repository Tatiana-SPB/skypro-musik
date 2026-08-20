import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';
import Bar from '@/components/Bar/Bar';
import { configureStore } from '@reduxjs/toolkit';
import { trackSliceReducer } from '@/store/features/trackSlice';
import { Provider } from 'react-redux';
import { authSliceReducer } from '@/store/features/authSlice';

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

describe('Bar Component', () => {
  test('Отрисовка данных текущего трека на плеере', async () => {
    const store = createMockStore(mockTrack);

    render(
      <Provider store={store}>
        <Bar />
      </Provider>,
    );

    expect(screen.getByText(mockTrack.author)).toBeInTheDocument();
    expect(screen.getByText(mockTrack.name)).toBeInTheDocument();
  });
});
