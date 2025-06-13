import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  RESET_PASSWORD_COMPLETE,
  FORGOT_PASSWORD_SUCCESS
} from '../actions/auth'; 

const initialState = {
  user: null,
  isAuthenticated: false, 
  isAuthChecked: false,
  canResetPassword: false,
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
        isAuthChecked: true,
      };
    case AUTH_FAILED:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isAuthChecked: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        canResetPassword: true,
        resetEmail: action.payload.email, 
      };
    case RESET_PASSWORD_COMPLETE:
      return {
        ...state,
        canResetPassword: false,
      };
      case 'AUTH_CHECKED':
        return {
          ...state,
          isAuthChecked: true,
        };
    default:
      return state;
  }
};