import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, TouchableOpacity,
} from 'react-native';


function Switch({value, setValue}) {

        return (
          <TouchableOpacity
            style={ value ? styles.view_switchOn :  styles.view_switchOff}
            onPress={() => {setValue(value => !value)} }
          >
            <View style={styles.view_switchIn} />
          </TouchableOpacity>
        );

}

export default Switch;

const styles = StyleSheet.create({
    
    view_switchOff: {
      height: 30,
      borderRadius: 20,
      flex: 15,
      flexDirection: 'row',
      backgroundColor: '#BCBCBC',
    },
    view_switchOn: {
      height: 30,
      borderRadius: 20,
      flex: 15,
      flexDirection: 'row-reverse',
      backgroundColor: '#0092A7',
    },
    view_switchIn: {
      height: 30,
      width: 30,
      borderRadius: 20,
      backgroundColor: '#fff',
    },
  });