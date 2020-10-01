import {IP_SERVER, PORT_SERVER} from '../env';

async function infoTage(props, accessToken) {
    fetch('http://' + IP_SERVER + ':' + PORT_SERVER + '/users/profile', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then(async (answer) => {
        if (answer.profile) {
          const action = {type: 'SET_USER', value: answer.profile};
          props.dispatch(action);
        } else {
          setInfo(answer.status);
        }
      })
      .catch((error) => {
        console.error('error :', error);
      });
  }
  
  exports.infoTage = infoTage;