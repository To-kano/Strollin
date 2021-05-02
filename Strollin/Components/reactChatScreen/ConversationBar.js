import { IP_SERVER, PORT_SERVER } from '../../env/Environement';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Image, Alert, Text, Button, TouchableOpacity } from 'react-native';
import socketIOClient from 'socket.io-client';
import {launchImageLibrary} from 'react-native-image-picker';
import ButtonIcon from '../ButtonIcon.js';
import {contextSocket} from '../Socket';
import { uploadImage } from '../../apiServer/image';
import Store from '../../Store/configureStore';

function ConversationBar(props) {
  const [research, setresearch] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const {sendImage} = contextSocket();


  const goToCourseScreen= () => {
    props.navigation.navigate("SendCourseScreen")
  }

  const handleChooseImage = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setImage(response);
      }
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
            style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "20%" }}
          />
          <Button title="Send Image" 
            onPress={async () => {
              if (image) {
                const store = Store.getState();
                const response = await uploadImage(store.profil.access_token, image);
                console.log("response image = ", response);
                if (response) {
                  setImage(null);
                  setImageName(response["image"]);
                  sendImage(response["image"]["id"]);
                }
              }
            }} />
          <Button title="Erase Image" onPress={cancelImage} />
        </>
      )}
      <View style={styles.horizontalDisplay}>
          
        <TouchableOpacity onPress={() => {
          goToCourseScreen(props);
        }}>
          <Image
            source={require('../../images/logo/marker_small.png')}
            style={{ width: 25, height: 35}}
          />
        </TouchableOpacity>
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
