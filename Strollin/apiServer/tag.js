import { IP_SERVER, PORT_SERVER } from '../env/Environement';

async function infoTage(props, access_token) {
  fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/profile`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token,
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then(async (answer) => {
      if (answer.profile) {
        const action = { type: 'SET_USER', value: answer.profile };
        props.dispatch(action);
      } else {
        //console.log(answer.status);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.infoTage = infoTage;

async function GetPlaces(access_token, tag, pos) {
  console.log("GET PLACES");
  console.log("tags: ", tag);
  var coordinate = []
  coordinate[0] = pos.latitude
  coordinate[1] = pos.longitude
  console.log("pos: ", coordinate);

  let answer = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/generator/recover_places`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token,
      coordinates: coordinate,
      tag: tag
    },
    method: 'GET',
  })
}

exports.GetPlaces = GetPlaces;
