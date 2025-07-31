import { authReducer } from './auth';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_COMPLETE,
} from '../actions/auth';

describe('authReducer', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isAuthChecked: false,
    canResetPassword: false,
  };

  it('should return the initial state when no action is passed', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle REGISTER_SUCCESS', () => {
    const action = {
      type: REGISTER_SUCCESS,
      payload: { user: { email: 'test@example.com', name: 'Test User' } },
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.payload.user,
      isAuthenticated: true,
      isAuthChecked: true,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: { user: { email: 'test@example.com', name: 'Test User' } },
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.payload.user,
      isAuthenticated: true,
      isAuthChecked: true,
    });
  });

  it('should handle GET_USER_SUCCESS', () => {
    const action = {
      type: GET_USER_SUCCESS,
      payload: { user: { email: 'user@example.com', name: 'User' } },
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.payload.user,
      isAuthenticated: true,
      isAuthChecked: true,
    });
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    const action = {
      type: UPDATE_USER_SUCCESS,
      payload: { user: { email: 'new@example.com', name: 'New Name' } },
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.payload.user,
      isAuthenticated: true,
      isAuthChecked: true,
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const state = {
      ...initialState,
      user: { email: 'test@example.com' },
      isAuthenticated: true,
    };
    const action = { type: LOGOUT_SUCCESS };
    expect(authReducer(state, action)).toEqual({
      ...state,
      user: null,
      isAuthenticated: false,
      isAuthChecked: true,
    });
  });

  it('should handle AUTH_FAILED', () => {
    const state = {
      ...initialState,
      user: { email: 'test@example.com' },
      isAuthenticated: true,
    };
    const action = { type: AUTH_FAILED };
    expect(authReducer(state, action)).toEqual({
      ...state,
      user: null,
      isAuthenticated: false,
      isAuthChecked: true,
    });
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const action = {
      type: FORGOT_PASSWORD_SUCCESS,
      payload: { email: 'forgot@example.com' },
    };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      canResetPassword: true,
      resetEmail: 'forgot@example.com',
    });
  });

  it('should handle RESET_PASSWORD_COMPLETE', () => {
    const state = {
      ...initialState,
      canResetPassword: true,
    };
    const action = { type: RESET_PASSWORD_COMPLETE };
    expect(authReducer(state, action)).toEqual({
      ...state,
      canResetPassword: false,
    });
  });

  it('should handle AUTH_CHECKED', () => {
    const action = { type: 'AUTH_CHECKED' };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });
});