import React, {useState} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, Alert, Modal } from 'react-native';

function ModalPhoto({statue, iconOn, iconOff, onPressOn, onPressOff}) {

    const [modalVisible, setModalVisible] = useState(false);

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
      </Modal>
    );
}

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderColor: 'gray'
  },
});

//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(ModalPhoto);
export default ModalPhoto;