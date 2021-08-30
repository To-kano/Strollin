import React, { useState, useEffect } from 'react';
import {
   View, Button, Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Modal from 'react-native-modal'

function FormDeleteLocationCourse({isVisible, setIsVisible}) {

  return (
    <View>
        <Modal isVisible={isVisible}>
          <View>
            <Button title={getName} color="#BB7859"/>
            <Button title="suprimez cette étape du trajet" onPress={() => {
            //console.log(deleteLocation)
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