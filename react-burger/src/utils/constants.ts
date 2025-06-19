export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = async <T>(res: Response): Promise<T> => {
   if (res.ok) {
    return res.json() as Promise<T>;
  } else {
    return Promise.reject(res.status);
  }
};