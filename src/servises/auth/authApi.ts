import axios from 'axios';
import { BASE_URL } from '@/servises/constants';

type authUserProps = {
  email: string;
  password: string;
};

type authUserReturn = {
  email: string;
  username: string;
  _id: number;
};

type regUserProps = {
  email: string;
  password: string;
  username: string;
};

export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/login/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const regUser = (data: regUserProps): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/signup/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

type accessTokenType = {
  access: string;
};

type refreshTokensType = {
  refresh: string;
};
type tokensType = accessTokenType & refreshTokensType;

export const getTokens = (data: authUserProps): Promise<tokensType> => {
  return axios.post(BASE_URL + '/user/token/', data).then((res) => res.data);
};

export const refreshToken = (refresh: string): Promise<accessTokenType> => {
  return axios
    .post(BASE_URL + '/user/token/refresh/', { refresh })
    .then((res) => res.data);
};
