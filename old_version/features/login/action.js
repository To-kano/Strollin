import { fire } from '../../dataBase/config';

export function isLoading(bool: Boolean) {
  return {
    type: 'LOGIN_ATTEMPT',
    isLoading: bool,
  };
}

export function loginSuccess(userData: Object) {
  return {
    type: 'LOGIN_SUCCESS',
    userData,
  };
}

export function loginFailed(error: Object) {
  return {
    type: 'LOGIN_FAILED',
    error,
  };
}

export function login(data: Object) {
  return (dispatch) => {
    console.log(`login :${data.email}${data.password}`);
    dispatch(isLoading(true));
    fire.auth().signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        dispatch(isLoading(false));
        console.log('responseJSON', response);
        console.log('responseJSON', response.user.email);
        console.log('responseJSON', response.user.uid);
        dispatch(loginSuccess({ email: response.user.email, uid: response.user.uid }));
      }).catch((error) => {
        console.log('error caught', error);
        dispatch(isLoading(false));
        dispatch(loginFailed(error));
      });
  };
}
