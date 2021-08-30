import React from 'react';
import {
   View, FlatList, Button,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Modal from '../Popup';

import FormLocationSelection from './FormLocationSelection';

function FormAddLocationCourse({isVisible, setIsVisible}) {

  return (
    <View>
        <Modal modalVisible={isVisible} setModalVisible={setIsVisible} >
          <View>
            <FormLocationSelection/>
            <Button title="ajouter cette étape du trajet" onPress={() => {
            //console.log(deleteLocation)
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