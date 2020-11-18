import { IP_SERVER, PORT_SERVER } from '../env/Environement';

async function infoTage(props, accessToken) {
  fetch(`https://${IP_SERVER}:${PORT_SERVER}/users/profile`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      accessToken,
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then(async (answer) => {
      if (answer.profile) {
        const action = { type: 'SET_USER', value: answer.profile };
        props.dispatch(action);
      } else {
        console.log(answer.status);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.infoTage = infoTage;
