import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Filter from '@/components/Filter/Filter';
import { trackSliceReducer } from '@/store/features/trackSlice';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';

// Создаем мок-стор
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      tracks: trackSliceReducer,
    },
    preloadedState: {
      tracks: {
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
          years: 'По умолчанию' as const,
        },
        search: '',
        ...initialState,
      },
    },
  });
};

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

const renderWithProvider = (
  component: React.ReactElement,
  initialState = {},
) => {
  const store = createMockStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Filter Component', () => {
  it('должен корректно отображать базовые кнопки фильтров', () => {
    renderWithProvider(<Filter tracks={mockTracks} />);

    expect(screen.getByText('Искать по:')).toBeInTheDocument();
    expect(screen.getByText('исполнителю')).toBeInTheDocument();
    expect(screen.getByText('году выпуска')).toBeInTheDocument();
    expect(screen.getByText('жанру')).toBeInTheDocument();
  });

  it('должен открывать список исполнителей при клике на фильтр', () => {
    renderWithProvider(<Filter tracks={mockTracks} />);

    const authorButton = screen.getByText('исполнителю');
    fireEvent.click(authorButton);

    expect(screen.getByText('Alexander Nakarada')).toBeInTheDocument();
    expect(screen.getByText('Frank Schroter')).toBeInTheDocument();
    expect(screen.getByText('Mixkit')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('Waltz Piano')).toBeInTheDocument();
    expect(screen.getByText('Winniethemoog')).toBeInTheDocument();
  });

  it('должен открывать список сортировки по годам при клике на фильтр', () => {
    renderWithProvider(<Filter tracks={mockTracks} />);

    const yearButton = screen.getByText('году выпуска');
    fireEvent.click(yearButton);

    expect(screen.getByText('По умолчанию')).toBeInTheDocument();
    expect(screen.getByText('Сначала новые')).toBeInTheDocument();
    expect(screen.getByText('Сначала старые')).toBeInTheDocument();
  });

  it('должен открывать список жанров при клике на фильтр', () => {
    renderWithProvider(<Filter tracks={mockTracks} />);

    const GenreButton = screen.getByText('жанру');
    fireEvent.click(GenreButton);

    expect(screen.getByText('Классическая музыка')).toBeInTheDocument();
    expect(screen.getByText('Электронная музыка')).toBeInTheDocument();
  });
});
