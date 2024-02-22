import { fetchSelf } from './actions/auth';
import { AUTH_TOKEN } from './constants';
import { addAuthToken } from './redux/slice/user';
import { AppDispatch } from './redux/store';

export const autoLogin = (callback?: Function) => {
  return async (dispatch: AppDispatch) => {
    const auth_token = localStorage.getItem(AUTH_TOKEN);

    if (auth_token) {
      dispatch(addAuthToken(auth_token));
      await dispatch(fetchSelf());
    }
    callback?.();
  };
};
