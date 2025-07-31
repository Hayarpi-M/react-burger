import { resetReducer, IResetState } from './reset'; // path to reducer
import { allowReset, clearReset } from '../actions/reset'; // path to action creators

describe('resetReducer', () => {
  const initialState: IResetState = {
    canResetPassword: false,
  };

  it('should return the initial state', () => {
    expect(resetReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle ALLOW_RESET', () => {
    const action = allowReset();
    const expectedState = {
      canResetPassword: true,
    };

    expect(resetReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_RESET', () => {
    const stateBefore: IResetState = {
      canResetPassword: true,
    };

    const action = clearReset();
    const expectedState = {
      canResetPassword: false,
    };

    expect(resetReducer(stateBefore, action)).toEqual(expectedState);
  });
});