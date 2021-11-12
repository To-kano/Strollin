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
import Icon from '../components/Icon';
import Geolocation from 'react-native-geolocation-service';
import requestGeolocalisationPermission from '../map'

const globalStyles = require('../../Styles');

function ConversationBar(props) {
  const [research, setresearch] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [MoreOptions, setMoreOptions] = useState(false);
  const [inputWidth, setinputWidth] = useState("75%");
  const {sendImage} = contextSocket();
  const {sendPosition} = contextSocket();
  const [position, setPosition] = useState("");


  const goToCourseScreen = () => {
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

  
  const prepareSendPosition = () => {
    //requestGeolocalisationPermission(Store.dispatch)
    Geolocation.getCurrentPosition(
      (position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      //console.log("pritn de pierre: ", position);
        const currentPosition = String(data.latitude) + ',' + String(data.longitude);
        sendPosition(currentPosition);
      },
      (error) => {
       //console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  
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
        <>
          {MoreOptions
            ? <>
                <TouchableOpacity onPress={() => { goToCourseScreen(); setMoreOptions(false); setinputWidth('75%')}}>
                  <Icon name="marker" size={29} color='#1C1B1C'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleChooseImage(); setMoreOptions(false); setinputWidth('75%')}}>
                  <Icon name="add_picture" size={29} color='#1C1B1C'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { prepareSendPosition(); setMoreOptions(false); setinputWidth('75%')}}>
                  <Icon name="marker" size={29} color='#1C1B1C'/>
                </TouchableOpacity>
              </>
            : 
              <TouchableOpacity onPress={() => { setMoreOptions(true); setinputWidth('55%')}}>
                  <Icon name="add" size={29} color='#1C1B1C'/>
              </TouchableOpacity>
          }
          <TextInput
            autoCapitalize={'none'}

            style={[globalStyles.textInput, {width: inputWidth, marginTop: 0}]}
            placeholder="Message.."
            onChangeText={(text) => setresearch(text)}
            value={research}
          />
          <TouchableOpacity
            onPress={() => {
              props.onPress(research);
              setresearch('');
            }}
          >
            <Icon name="send" size={29} color='#1C1B1C'/>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view_imageDisplay: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    left: 0, right: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    flexDirection: 'row',
    shadowOffset: {
        width: 0,
        height: 5,
      },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  img_imageDisplay: {
    width: 120,
    height: 70,
    borderRadius: 12,
    marginRight: 10,
  },
  view_conversationBar: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    left: 0, right: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    flexDirection: 'row',
    shadowOffset: {
        width: 0,
        height: 5,
      },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  img_conversationBar: {
    width: 35,
    height: 35,
  },
  textInput_conversationBar: {
    height: 48,
    borderRadius: 4,
    fontSize: 16,
    color: '#1C1B1C',
    backgroundColor: '#fff',
    paddingLeft: 8, 
    paddingRight: 8, 
    paddingTop: 8, 
    paddingBottom: 8, 
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ConversationBar);
