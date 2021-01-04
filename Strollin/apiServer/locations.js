import { IP_SERVER, PORT_SERVER } from '../env/Environement';

async function getloc(access_Token, args) {
  console.log("getloc(): ", access_Token);
   return fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/get_locations`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_Token,
    },
    method: 'GET',
  })
  .then(res => res.json())
  .then(json => {
    console.log("json: ", json.locations_list[0])
    return json.locations_list[0]
  });
}

exports.getloc = getloc;
