import { IP_SERVER, PORT_SERVER } from '../env/Environement';

import {saveNewCourse, getCourseCacheById} from '../cache/course'


async function getCustomCourse(access_token) {
    console.log("getCustomCourse(): ", access_token);
    
     let answer = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/get_course`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_token,
        sort : "name",
      },
      method: 'GET',
    })

    answer =  await answer.json();
    console.log("getCustomCourse result : ", answer.courses_list[0])
  //
    //saveNewCourse(answer);
//
    return answer.courses_list[0];
  
  }
  
  exports.getCustomCourse = getCustomCourse;