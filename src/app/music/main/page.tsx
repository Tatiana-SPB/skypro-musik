'use client';
import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const { fetchError, fetchIsLoading, allTracks, filteredTracks, filters } =
    useAppSelector((state) => state.tracks);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  useEffect(() => {
    const currentPlaylist = filters.authors.length ? filteredTracks : allTracks;
    setPlaylist(currentPlaylist);
  }, [filteredTracks, allTracks]);
  return (
    <>
      <Centerblock
        pagePlaylist={allTracks}
        tracks={playlist}
        errorRes={fetchError}
        isLoading={fetchIsLoading}
        title={'Треки'}
      />
    </>
  );
}
