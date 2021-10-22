import React from 'react';
import {  Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from './components/Icon';
const globalStyles = require('../Styles');

function Popup({message, modalVisible, setModalVisible, children}) {

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32}}>
              <Text style={globalStyles.subtitles}>{message}</Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Icon name='close' size={24} color='#1C1B1C'/>
              </TouchableOpacity>
            </View>
            {children}
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: 'rgba(100,100,100,0.75)'
    },
    modalView: {
      width: '100%',
      backgroundColor: "#ffffff",
      borderRadius: 16,
      padding: 16,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default Popup;
