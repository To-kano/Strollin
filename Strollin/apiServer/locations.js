import { IP_SERVER, PORT_SERVER } from '../env/Environement';

import {saveNewLocation, getLocationCacheById} from '../cache/location'

async function getLocationByID(access_token, id) {
//console.log("getloc(): ", access_token," id ", id);

  //if (getLocationCacheById(id)){
  //  return getLocationCacheById(id);
  //}

   let answer = await fetch(`https://${IP_SERVER}:${PORT_SERVER}/location/get_locations_by_id`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token,
      locations_id_list : id,
    },
    method: 'GET',
  })

  answer = await answer.json();
//console.log("getLocationByID result : ", answer.locations_list[0])

  //saveNewLocation(answer);
  return answer.locations_list[0];

}

exports.getLocationByID = getLocationByID;

async function getLocationByIDList(access_token, id_list) {
  
     let answer = await fetch(`https://${IP_SERVER}:${PORT_SERVER}/location/get_locations_by_id`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_token,
        locations_id_list : id_list,
      },
      method: 'GET',
    })
  
    answer = await answer.json();
  
    return answer.locations_list;
  
  }

  exports.getLocationByIDList = getLocationByIDList;

async function getloc(access_Token) {
//console.log("getloc(): ", access_Token);
   return fetch(`https://${IP_SERVER}:${PORT_SERVER}/location/get_locations`, {
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
