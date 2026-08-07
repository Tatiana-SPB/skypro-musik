import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};

export const getTracksSort = (id: string): Promise<TrackType[]> => {
  const url = `${BASE_URL}/catalog/selection/${id}/`;

  return Promise.all([
    getTracks(),
    axios.get<{ data: { items: number[] } | null }>(url),
  ]).then(([tracks, selectionRes]) => {
    //получаем Id треков
    const trackIds = selectionRes.data.data?.items ?? [];
    //найдем треки по Id
    const tracksById = new Map(tracks.map((track) => [track._id, track]));
    //возвращаем треки в том же порядке, как в подборке
    return trackIds.flatMap((trackId) => {
      const track = tracksById.get(trackId);
      return track ? [track] : [];
    });
  });
};
