import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS
} from '../actions/auth';

const initialState = {
  user: null,
  isAuthenticated: false, 
  isAuthChecked: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isAuthChecked: true,
      };
    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isAuthChecked: true,
      };  
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false, 
        isAuthChecked: false,
      };
    case AUTH_FAILED:
      return {
        ...state,
        user: null,
        isAuthChecked: false,
      };
    default:
      return state;
  }
};