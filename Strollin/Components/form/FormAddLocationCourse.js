import React, {useState} from 'react';
import {
   View, FlatList, Button,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Modal from '../Popup';
import Store from '../../Store/configureStore';
import FormLocationSelection from './FormLocationSelection';


function addLocationToTrip(locationIdArray) {
  const store = Store.getState();

  const currentCourseLocation = store.course.currentCourse.locations_list;

  const action = {
    type : 'CHANGE_CURRENT_COURSE_LOCATION_PROPOSITION',
    value : [...currentCourseLocation, ...locationIdArray]
  }

  //console.log("addLocationToTrip action:", action);

  Store.dispatch(action);


}


function FormAddLocationCourse({isVisible, setIsVisible}) {

  const [selectedLocation, setSelectedLocation] = useState([]);

  return (
    <View>
        <Modal modalVisible={isVisible} setModalVisible={setIsVisible} >
          <View>
            <FormLocationSelection setSelectedLocation={setSelectedLocation} />
            <Button title="ajouter cette étape du trajet" onPress={() => {
              addLocationToTrip(selectedLocation);
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

export default FormAddLocationCourse;