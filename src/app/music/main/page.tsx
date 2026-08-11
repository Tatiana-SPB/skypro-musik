'use client';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

export default function MainPage() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );
  return (
    <>
      <Centerblock
        tracks={allTracks}
        errorRes={fetchError}
        isLoading={fetchIsLoading}
        title={'Треки'}
      />
    </>
  );
}
