import { IP_SERVER, PORT_SERVER } from '../env/Environement';

import {saveNewCourse, getCourseCacheById} from '../cache/course'


async function getCustomCourse(access_Token) {
    console.log("getloc(): ", access_Token);
    
     let answer = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/get_custom_course`, {
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
  
    saveNewCourse(answer);
    return answer;
  
  }
  
  exports.getCustomCourse = getCustomCourse;