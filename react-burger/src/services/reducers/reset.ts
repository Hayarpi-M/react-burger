export const ALLOW_RESET = 'ALLOW_RESET' as const;
export const CLEAR_RESET = 'CLEAR_RESET' as const;

export interface IResetState {
  canResetPassword: boolean;
}

export type TResetActions = 
| {type: typeof ALLOW_RESET}
| {type: typeof CLEAR_RESET}

const initialState:IResetState = {
  canResetPassword: false
};

export const resetReducer = (state = initialState, action: TResetActions) => {
  switch (action.type) {
    case 'ALLOW_RESET':
      return { ...state, canResetPassword: true };
    case 'CLEAR_RESET':
      return { ...state, canResetPassword: false };
    default:
      return state;
  }
};