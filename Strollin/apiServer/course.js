import { IP_SERVER, PORT_SERVER } from '../env/Environement';

import {saveNewCourse, getCourseCacheById} from '../cache/course'


async function getCustomCourse(access_token, setCourse) {
    console.log("getCustomCourse(): ", access_token);
    
     let answer = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/get_course`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_token,
        sort : "name",
        id,
      },
      method: 'GET',
    })
  
    answer = await answer.json();
    console.log("getLocationByID result : ", answer[0])
  
    saveNewCourse(answer);

    if (setCourse) {
      setCourse(answer);
    }
    return answer;
  
  }
  
  exports.getCustomCourse = getCustomCourse;