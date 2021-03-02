import { IP_SERVER, PORT_SERVER } from '../env/Environement';

import {saveNewLocation, getLocationCacheById} from '../cache/location'

async function getLocationByID(access_Token, id) {
  console.log("getloc(): ", access_Token," id ", id);

  if (getLocationCacheById(id)){
    return getLocationCacheById(id);
  }

   let answer = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/get_locations_by_id`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_Token,
      id,
    },
    method: 'GET',
  })

  answer = await answer.json();
  console.log("getLocationByID result : ", json)

  saveNewLocation(answer);
  return answer;

}

exports.getLocationByID = getLocationByID;

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
