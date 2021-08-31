import React, {useState} from 'react';
import {
   View, FlatList, Button,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Modal from '../Popup';
import Store from '../../Store/configureStore';

import FormLocationSelection from './FormLocationSelection';

function changeLocationToTrip(locationIdArray, deletedLocationId) {
    const store = Store.getState();
  
    const currentCourseLocation = store.course.currentCourse.locations_list;

    const indexFound = currentCourseLocation.findIndex((value) => value == deletedLocationId)

    const result = currentCourseLocation.splice(indexFound, 1, ...locationIdArray);
  
    const action = {
      type : 'CHANGE_CURRENT_COURSE_LOCATION_PROPOSITION',
      value : result
    }
  
    Store.dispatch(action);
  
  
  }

function FormUpdateLocationCourse({isVisible, setIsVisible, itemId}) {

    const [selectedLocation, setSelectedLocation] = useState([]);

    return (
        <View>
            <Modal modalVisible={isVisible} setModalVisible={setIsVisible}>
              <View>
                <FormLocationSelection setSelectedLocation={setSelectedLocation} />
                <Button title="changer cette étape du trajet avec la selection" onPress={() => {
                    changeLocationToTrip(selectedLocation, itemId);
                    setIsVisible(false);
                }} />
                <Button title="fermer cette pop-up" onPress={() => {
                    setIsVisible(false);
                }} />
              </View>
            </Modal>
          </View>
      )

}

export default FormUpdateLocationCourse;