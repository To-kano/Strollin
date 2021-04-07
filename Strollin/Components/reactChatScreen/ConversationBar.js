import { IP_SERVER, PORT_SERVER } from '../../env/Environement';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Image, Alert, Text, Button } from 'react-native';
import socketIOClient from 'socket.io-client';
import {launchImageLibrary} from 'react-native-image-picker';
import ButtonIcon from '../ButtonIcon.js';

function ConversationBar(props) {
  const [research, setresearch] = useState('');
  const [image, setImage] = useState(null);

  const createFormData = (image, body = {}) => {
    const data = new FormData();
  
    data.append('image', {
      name: image.fileName,
      type: image.type,
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    console.log("form data ", data._parts);
  
    return data;
  };

  const handleChooseImage = () => {
    launchImageLibrary({ noData: true }, (response) => {
       console.log(response);
      if (response) {
        setImage(response);
      }
    });
  };

  const handleUploadImage = () => {
    fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_image_profile`, {
      method: 'POST',
      body: createFormData(image, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
        setImage(null);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const cancelImage = () => {
    setImage(null);
  };
  
  return (
    <View style={styles.container}>
      {image && (
        <>
          <Image
            source={{ uri: image.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Discard Image" onPress={cancelImage} />
        </>
      )}
      <View style={styles.horizontalDisplay}>
        <ButtonIcon
          icon={require('../../images/picture.png')}
          onPress={handleChooseImage}
        />
        <View style={styles.box}>
          <TextInput
            style={styles.textInput}
            placeholder="Your message"
            onChangeText={(text) => setresearch(text)}
            value={research}
          />
        </View>
        <ButtonIcon
          icon={require('../../images/send.png')}
          onPress={() => {
            props.onPress(research);
            setresearch('');
            handleUploadImage();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  box: {
    flex: 1,
  },
  horizontalDisplay: {
    width: '97 %',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ConversationBar);
