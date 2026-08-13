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

export const addLike = (access: string, id: number) => {
  return axios.post(
    `${BASE_URL}/catalog/track/${id}/favorite`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(`${BASE_URL}/catalog/track/${id}/favorite`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const getTracksFavoriteRaw = (access: string): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/favorite/all/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then((res) => res.data.data as TrackType[]);
};
