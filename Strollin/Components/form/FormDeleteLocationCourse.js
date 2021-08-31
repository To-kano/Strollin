import React, { useState, useEffect } from 'react';
import {
   View, Button, Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Modal from 'react-native-modal';
import Store from '../../Store/configureStore';


function deleteLocationFromTrip(deletedLocationId) {
  const store = Store.getState();

  const currentCourseLocation = store.course.currentCourse.locations_list;

  const result = currentCourseLocation.filter(function(value, index, arr){ 
    return value != deletedLocationId;
  });

  const action = {
    type : 'CHANGE_CURRENT_COURSE_LOCATION_PROPOSITION',
    value : result
  }

  Store.dispatch(action);


}

function FormDeleteLocationCourse({isVisible, setIsVisible, itemId}) {

  return (
    <View>
        <Modal isVisible={isVisible}>
          <View>
            <Button title="suprimez cette étape du trajet" onPress={() => {
            //console.log(deleteLocation)
              deleteLocationFromTrip(itemId);
              setIsVisible(false);
          }} />
            <Button title="garder cette étape du trajet" onPress={() => {
              setIsVisible(false);
            }} />
          </View>
        </Modal>
      </View>
  )

}

export default FormDeleteLocationCourse;