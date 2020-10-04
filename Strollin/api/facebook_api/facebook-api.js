import {
  GraphRequest, GraphRequestManager
} from 'react-native-fbsdk';

const getInfoFromToken = (token, setUserInfo) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name,  first_name, last_name',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    { token, parameters: PROFILE_REQUEST_PARAMS },
    (error, result) => {
      if (error) {
        console.log(`login info has error: ${error}`);
      } else {
        setUserInfo(result);
        console.log('result:', result);
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
};
