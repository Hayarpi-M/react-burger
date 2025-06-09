const initialState = {
  canResetPassword: false
};

export const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALLOW_RESET':
      return { ...state, canResetPassword: true };
    case 'CLEAR_RESET':
      return { ...state, canResetPassword: false };
    default:
      return state;
  }
};