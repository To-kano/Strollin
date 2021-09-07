import { IP_SERVER, PORT_SERVER } from '../../env/Environement';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, StyleSheet, TextInput, View, Image, Alert, Text, Button, TouchableOpacity } from 'react-native';
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
  
  if (image) {
    return (
      <View style={styles.view_imageDisplay}>
        <Image source={{ uri: image.uri }} style={styles.img_imageDisplay} />
        <View>
          <TouchableOpacity style={styles.imgView_conversationBar} onPress={cancelImage}>
            <Image style={styles.img_conversationBar} source={require('../../images/icons/black/deletePicture.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imgView_conversationBar}
            onPress={async () => {
              if (image) {
                const store = Store.getState();
                const response = await uploadImage(store.profil.access_token, image);
              //console.log("response image = ", response);
                if (response) {
                  setImage(null);
                  setImageName(response["image"]);
                  sendImage(response["image"]["id"]);
                }
              }
            }}
          >
            <Image style={styles.img_conversationBar} source={require('../../images/icons/black/send.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.view_conversationBar}>
      {image && (
        <View style={styles.view_imageDisplay}>
          <Image
            source={{ uri: image.uri }}
            style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "20%" }}
          />
          <Button title="Send Image" 
            onPress={async () => {
              if (image) {
                const store = Store.getState();
                const response = await uploadImage(store.profil.access_token, image);
              //console.log("response image = ", response);
                if (response) {
                  setImage(null);
                  setImageName(response["image"]);
                  sendImage(response["image"]["id"]);
                }
              }
            }} />
          <Button title="Erase Image" onPress={cancelImage} />
        </View>
      )}
      {!image && (
        <View style={styles.view_horizontalDisplay}>
          <TouchableOpacity style={styles.imgView_conversationBar} onPress={() => { goToCourseScreen(); }}>
            <Image style={styles.img_conversationBar} source={require('../../images/logo/marker_small_tchat.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imgView_conversationBar} onPress={handleChooseImage}>
            <Image style={styles.img_conversationBar} source={require('../../images/icons/black/addPicture.png')} />
          </TouchableOpacity>
          <TextInput
          autoCapitalize={'none'}
            style={styles.textInput_conversationBar}
            placeholder="Message.."
            onChangeText={(text) => setresearch(text)}
            value={research}
          />
          <TouchableOpacity
            style={styles.imgView_conversationBar}
            onPress={() => {
              props.onPress(research);
              setresearch('');
            }}
          >
            <Image style={styles.img_conversationBar} source={require('../../images/icons/black/send.png')} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view_imageDisplay: {
    marginTop: 10,
    marginBottom: 15,
    flex: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 5, 
    paddingBottom: 5,
  },
  img_imageDisplay: {
    width: 120,
    height: 70,
    borderRadius: 12,
    marginRight: 10,
  },
  view_conversationBar: {
    marginTop: 10,
    marginBottom: 15,
    flex: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  view_horizontalDisplay: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgView_conversationBar: {
    flex: 1,
  },
  img_conversationBar: {
    width: 35,
    height: 35,
  },
  textInput_conversationBar: {
    flex: 4,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    paddingLeft: 10, 
    paddingRight: 10, 
    paddingTop: 10, 
    paddingBottom: 10, 
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ConversationBar);
