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

function addUserData() {

}

export function register(data: Object) {
  return (dispatch) => {
    console.log(`login :${data.email}${data.password}`);
    dispatch(isLoading(true));
    fire.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        dispatch(isLoading(false));
        console.log('responseJSON', response);
        console.log('responseJSON', response.user.email);
        console.log('responseJSON', response.user.uid);
        dispatch(loginSuccess({ email: response.user.email, uid: response.user.uid }));
        fire.firestore().collection('userData').doc(response.user.uid).set({
          email: response.user.email,
          tagList: {},
          status: 'alive'
        });
      }).catch((error) => {
        console.log('error', error);
        dispatch(isLoading(false));
        dispatch(loginFailed(error));
      });
  };
}
/*
fire.firestore().collection(userId).get().then(snapshot => {
            snapshot.forEach(doc => {
              var tmp = doc.id.split('-')
              var widgetName = tmp[0]
              var widgetID = tmp[1]
              var widget = {widget: widgetName, id: widgetID, data1: doc.data.data1, data2: doc.data.data2}
              commit('SET_WIDGETS', widget)
            })
          }) */
