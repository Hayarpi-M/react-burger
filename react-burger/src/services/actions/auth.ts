import {
  registerRequest,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
} from '../auth-api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookies';
import {BASE_URL} from '../../utils/constants';
import { RootState } from '../reducers/index';
import { AppDispatch } from '../store';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_COMPLETE = 'RESET_PASSWORD_COMPLETE';

interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

export const register = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    registerRequest(email, password, name)
      .then((res: AuthResponse) => {
        if (res.success) {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch({ type: REGISTER_SUCCESS, payload: res });
        }
      })
      .catch(() => {
        dispatch({ type: AUTH_FAILED });
      });
  };
};

export const login = (email: string, password: string, callback?: () => void) => async (dispatch: AppDispatch)  => {
  try {
    const res: AuthResponse = await loginRequest(email, password);

    if (res.success) {
      const accessToken = res.accessToken.split('Bearer ')[1];

      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      dispatch({ type: LOGIN_SUCCESS, payload: res });

      if (callback) {
        callback(); 
      }
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    dispatch({ type: AUTH_FAILED });
  }
};

export const logout = () => {
  return function (dispatch: AppDispatch) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;
    logoutRequest(refreshToken)
      .then((res: { success: boolean }) => {
        if (res.success) {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch({ type: LOGOUT_SUCCESS });
        }
      })
      .catch(() => {
        dispatch({ type: AUTH_FAILED });
      });
  };
};

export const refreshToken = () => {
  return function (dispatch: AppDispatch) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;
    refreshTokenRequest(refreshToken)
      .then((res: AuthResponse) => {
        if (res.success) {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(getUser()); 
          return res;
        }
      })
      .catch(() => {
        dispatch({ type: AUTH_FAILED });
      })
      .finally(()=>{
        dispatch({ type: 'AUTH_CHECKED' })
      });
  };
};

// services/actions/auth.js

export const forgotPassword = (email: string) => async (dispatch: AppDispatch): Promise<ForgotPasswordResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.success) {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS,  payload: { email } });
      return { success: true };
    } else {
      return { success: false, message: data.message || 'Ошибка при восстановлении пароля' };
    }
  } catch (error) {
    return { success: false, message: 'Ошибка сети. Попробуйте снова.' };
  }
};

export const getUser = () => {
  return function (dispatch: AppDispatch, getState: () => RootState): void | Promise<void>  {
    const token = getCookie('accessToken');
    if (!token) return;

    const state = getState();
    if (state.auth.user) {
      return; // already loaded
    }

    fetch(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((data: { success: boolean; user: { email: string; name: string } }) => {
        if (data.success) {
          dispatch({ type: GET_USER_SUCCESS, payload: data.user });
        }
      })
      .catch(() => {
        dispatch({ type: AUTH_FAILED });
      })
      .finally(()=>{
        dispatch({ type: 'AUTH_CHECKED' })
      });
  };
};

export const updateUser = (name: string, email:string, password?:string) => {
  return function (dispatch:AppDispatch) {
    const token = getCookie('accessToken');
    if (!token) return;

    fetch(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, ...(password && { password }) })
    })
      .then(res => res.json())
      .then((data: { success: boolean; user: { email: string; name: string } }) => {
        if (data.success) {
          dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
        }
      })
      .catch(() => {
        dispatch({ type: AUTH_FAILED });
      });
  };
};