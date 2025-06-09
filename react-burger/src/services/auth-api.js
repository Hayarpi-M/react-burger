import {BASE_URL} from '../utils/constants';

export const registerRequest = (email, password, name) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  }).then(res => res.json());
};

export const loginRequest = (email, password) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(res => res.json());
};

export const logoutRequest = (refreshToken) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  }).then(res => res.json());
};

export const refreshTokenRequest = (refreshToken) => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  }).then(res => res.json());
};