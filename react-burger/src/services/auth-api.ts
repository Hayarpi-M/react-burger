import {BASE_URL, checkResponse} from '../utils/constants';

export interface IAuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

export interface ILogoutResponse {
  success: boolean;
  message: string;
}

export interface ITokenRefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export const registerRequest = (email: string, password: string, name: string):
Promise<IAuthResponse> => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse<IAuthResponse>);
};

export const loginRequest = (email:string, password:string): Promise<IAuthResponse> => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse<IAuthResponse>);
};

export const logoutRequest = (refreshToken: string): Promise<ILogoutResponse> => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse<ILogoutResponse>);
};

export const refreshTokenRequest = (refreshToken: string): Promise<ITokenRefreshResponse> => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse<ITokenRefreshResponse>);
};