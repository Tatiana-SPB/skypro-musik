import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

interface SelectionResponse {
  data: {
    name: string;
    items: number[];
  };
}

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};

export const getTracksSort = (
  id: string,
): Promise<SelectionResponse['data']> => {
  return axios
    .get<SelectionResponse>(`${BASE_URL}/catalog/selection/${id}/`)
    .then((res) => res.data.data);
};