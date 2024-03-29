import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Text, View, Image, FlatList, Button, ImageBackground, TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';

import ElementHistoryNav from './HistoryElement';
import CourseItem from './CourseItem';


import {getCourseById} from '../apiServer/course';
import {getLocationByID} from '../apiServer/locations';

async function getArrayLocation(access_token, idLocations) {
    let result = [];
    for (let i = 0; i < idLocations.length; i++) {
      result.push(await getLocationByID(access_token, idLocations[i]));
    }
  
    return result
}

export function HistoryItem(props) {


    const [course, setCourse] = useState(null);

  useEffect(() => {
    async function getCourse() {
      const result = await getCourseById(props.profil.access_token, props.courseId[0]);

      setCourse(result);
    }

    //async function getLocations() {
    //  const result = await getArrayLocation(props.profil.access_token, course.locations_list)
//
    //  setLocations(result);
    //}

    if (!course) {
      getCourse();
    }

    //if (course && course.locations_list) {
    //  getLocations();
    //}

  }, [course]);

  //const [locations, setLocations] = useState(null);
//console.log("props.profil : ", props.profil);
//console.log("props.courseId : ", props.courseId);
console.log("course : ", props.courseId);
//console.log("locations : ", locations);
  if (course) {
    return (
      <View style={styles.view_historic}>
        <View style={styles.view_historicTop}>
          <View style={styles.view_information}>
            <Image style={styles.img_date} source={require('../images/icons/black/calendar.png')}/>
            <Text style={styles.text_date}>{props.courseId[1]}</Text>
          </View>
          {/* <View style={styles.view_information}>
            <Image style={styles.img_props.duration} source={require('../images/icons/black/time.png')}/>
            <Text style={styles.text_props.duration}>{props.courseId}</Text>
          </View> */}
            {/*<ElementHistoryNav course={course} locations={locations}/>*/}
            <CourseItem 
              {...props}
              data={course} />
        </View>
      </View>

    );
  }
  else {
    return (<View></View>);
  }

}
  
  
const mapStateToProps = (state) => state;
  export default connect(mapStateToProps)(HistoryItem);
  
  const styles = StyleSheet.create({
    view_back: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#E1E2E7',
      paddingTop: '1.8%',
      paddingLeft: '3.3%',
      paddingRight: '3.3%',
      paddingBottom: '0%',
    },
    view_header: {
      flex: 50,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    img_header: {
      width: 34,
      resizeMode: 'contain',
    },
    text_header: {
      width: '77.8%',
      fontWeight: 'bold',
      fontSize: 28,
      letterSpacing: 2,
      textAlign: 'center',
      color: '#000000',
    },
    viex_list: {
      flex: 757,
    },
    view_historic: {
      flexDirection: 'column',
      marginBottom: 10,
    },
    view_information: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    img_date: {
      width: 25,
      height: 25,
      marginRight: 10,
    },
    text_date: {
      flex: 2,
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 1,
      color: '#333333',
    },
    img_duration: {
      width: 25,
      height: 25,
      marginRight: 10,
    },
    text_duration: {
      flex: 1,
      fontSize: 12,
      fontWeight: 'bold',
      letterSpacing: 1,
      color: '#333333',
      alignContent: 'flex-end',
      justifyContent: 'flex-end',
    },
    view_historicTop: {
      flexDirection: 'column',
    },
  
  });
  