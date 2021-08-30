import React from 'react';
import {
   View, FlatList, Button,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Modal from 'react-native-modal';

function FormAddLocationCourse({isVisible, setIsVisible}) {

  return (
    <View>
        <Modal isVisible={isVisible}>
          <View>
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