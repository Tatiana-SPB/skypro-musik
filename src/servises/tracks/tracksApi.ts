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

  return axios
    .get<{ data: TrackType[] | null }>(url)
    .then((res) => {
      return res.data.data ?? [];
    })
    .catch((error) => {
      console.error('API Error:', error);
      throw error;
    });
};
