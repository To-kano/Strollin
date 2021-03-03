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
    console.log("getCustomCourse result : ", answer)
    console.log("getCustomCourse result : ", answer.courses_list[0])
  //
    //saveNewCourse(answer);
//
    return answer.courses_list[0];
  
  }
  
  exports.getCustomCourse = getCustomCourse;


  async function getCourseById(access_token, id) {
    console.log("getCourseById(): ", access_token);
    
     let answer = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/get_courses_by_id`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_token,
        courses_id_list : id,
      },
      method: 'GET',
    })

    answer =  await answer.json();
    console.log("getCourseById result : ", answer)
    console.log("getCourseById result : ", answer.courses_list[0])
  //
    //saveNewCourse(answer);
//
    return answer.courses_list[0];
  
  }
  
  exports.getCourseById = getCourseById;