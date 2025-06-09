import {
  registerRequest,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
} from '../auth-api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookies';
import {BASE_URL} from '../../utils/constants';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const register = (email, password, name) => {
  return function (dispatch) {
    registerRequest(email, password, name)
      .then(res => {
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

export const login = (email, password, callback) => async (dispatch)  => {
  try {
    const res = await loginRequest(email, password);

    if (res.success) {
      const accessToken = res.accessToken.split('Bearer ')[1];

      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      dispatch({ type: LOGIN_SUCCESS, payload: res });

      if (callback) {
        callback(); // ✅ trigger navigation after successful login
      }
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    dispatch({ type: AUTH_FAILED });
  }
};

export const logout = () => {
  return function (dispatch) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;
    logoutRequest(refreshToken)
      .then(res => {
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
  return function (dispatch) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;
    refreshTokenRequest(refreshToken)
      .then(res => {
        if (res.success) {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          localStorage.setItem('refreshToken', res.refreshToken);
        }
      })
      .catch(() => {
        dispatch({ type: AUTH_FAILED });
      });
  };
};

// services/actions/auth.js

export const forgotPassword = (email) => async (dispatch) => {
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
      // optional: dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' });
      return { success: true };
    } else {
      // optional: dispatch({ type: 'FORGOT_PASSWORD_ERROR' });
      return { success: false, message: data.message || 'Ошибка при восстановлении пароля' };
    }
  } catch (error) {
    return { success: false, message: 'Ошибка сети. Попробуйте снова.' };
  }
};

export const getUser = () => {
  return function (dispatch) {
    const token = getCookie('accessToken');
    if (!token) return;

    fetch(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({ type: GET_USER_SUCCESS, payload: data.user });
        }
      })
      .catch(() => {
        dispatch({ type: AUTH_FAILED });
      });
  };
};

export const updateUser = (name, email, password) => {
  return function (dispatch) {
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
      .then(data => {
        if (data.success) {
          dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
        }
      })
      .catch(() => {
        dispatch({ type: AUTH_FAILED });
      });
  };
};