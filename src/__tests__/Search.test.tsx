import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Search from '../components/Search/Search';
import { trackSliceReducer } from '@/store/features/trackSlice';

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

describe('Search Component', () => {
  it('должен отрендериться с пустым полем поиска', () => {
    renderWithProvider(<Search />);

    const input = screen.getByPlaceholderText('Поиск');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('должен отображать текущее значение из Redux', () => {
    renderWithProvider(<Search />, {
      search: 'test query',
    });

    const input = screen.getByPlaceholderText('Поиск');
    expect(input).toHaveValue('test query');
  });

  it('должен обновлять состояние при вводе текста', () => {
    const { store } = renderWithProvider(<Search />);

    const input = screen.getByPlaceholderText('Поиск');
    fireEvent.change(input, { target: { value: 'новый запрос' } });

    expect(store.getState().tracks.search).toBe('новый запрос');
  });

  it('должен очищать поле при вводе пустой строки', () => {
    const { store } = renderWithProvider(<Search />, {
      search: '',
    });

    const input = screen.getByPlaceholderText('Поиск');
    fireEvent.change(input, { target: { value: '' } });

    expect(store.getState().tracks.search).toBe('');
  });

  it('должен иметь корректный тип input', () => {
    renderWithProvider(<Search />);

    const input = screen.getByPlaceholderText('Поиск');
    expect(input).toHaveAttribute('type', 'search');
  });
});
