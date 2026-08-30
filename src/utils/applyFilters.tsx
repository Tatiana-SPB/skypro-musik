import { initialStateType } from '@/store/features/trackSlice';

export const applyFilters = (state: initialStateType) => {
  let result = [...state.pagePlaylist];

  if (state.filters.authors.length > 0) {
    result = result.filter((track) =>
      state.filters.authors.includes(track.author),
    );
  }
  if (state.filters.genres.length > 0) {
    result = result.filter((track) =>
      state.filters.genres.some((genre) => track.genre.includes(genre)),
    );
  }
  if (state.search.trim().length > 0) {
    const query = state.search.toLowerCase();
    result = result.filter((track) => track.name.toLowerCase().includes(query));
  }
  return result;
};
