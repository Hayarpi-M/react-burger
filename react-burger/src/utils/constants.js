export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};