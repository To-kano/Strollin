import { IP_SERVER, PORT_SERVER } from '../../env/Environement';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Image, Alert, Text, Button } from 'react-native';
import socketIOClient from 'socket.io-client';
import {launchImageLibrary} from 'react-native-image-picker';
import ButtonIcon from '../ButtonIcon.js';

//const createFormData = (photo, body = {}) => {
//  const data = new FormData();
//
//  data.append('photo', {
//    name: photo.fileName,
//    type: photo.type,
//    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
//  });
//
//  Object.keys(body).forEach((key) => {
//    data.append(key, body[key]);
//  });
//
//  return data;
//};
/*function createFormData(image) {
  const data = new FormData();

  data.append("image", {
    name: image.fileName,
    type: image.type,
    uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '')
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};*/

function selectImage(setImage, props) {
  //let options = {
  //  title: 'You can choose one image',
  //  maxWidth: 256,
  //  maxHeight: 256,
  //  storageOptions: {
  //    skipBackup: true
  //  }
  //};

  //const handleUploadPhoto = () => {
  //  fetch(`${SERVER_URL}/upload`, {
  //    method: 'POST',
  //    body: createFormData(photo, { userId: '123' }),
  //  })
  //    .then((response) => response.json())
  //    .then((response) => {
  //      console.log('response', response);
  //    })
  //    .catch((error) => {
  //      console.log('error', error);
  //    });
  //};

  launchImageLibrary({ noData: true }, async (response) => {
    console.log("response =", { response });

    if (response.didCancel) {
      console.log('User cancelled photo picker');
      Alert.alert('You did not select any image');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      console.log('Sending image...');

      setImage(response);
      
      let answer = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_image_profile`, {
        //headers: {
        //  Accept: 'application/json',
        //  'Content-Type': 'application/json',
        //  //access_token: props.profil.access_token
        //},
        method: 'post',
        body: createFormData(response, { userId: '123' })
      })

      answer = await answer.json();

      console.log("answer", answer);
        //.then((response) => response.json())
        //.then(async (answer) => {
        //  console.log('response', response);
        //  //if (answer.access_token) {
        //  //  console.log('upload succes', response);
        //  //} else {
        //  //  console.log('upload failed', response);
        //  //}
        //})
        //.catch((error) => {
        //  console.error('error :', error);
        //});
    }
  });
}

//function ConversationBar(props) {
//  const [research, setresearch] = useState('');
//  const [image, setImage] = useState(null);
//  
//  return (
//    <View style={styles.container}>
//      {image && (
//          <Image
//            source={{ uri: image.uri }}
//            style={{ width: 200, height: 200 }}
//          />
//        )}
//      <View style={styles.horizontalDisplay}>
//        <ButtonIcon
//          icon={require('../../images/picture.png')}
//          onPress={() => {
//            selectImage(setImage, props);
//            console.log("image = ", image)
//          }}
//        />
//        <View style={styles.box}>
//          <TextInput
//            style={styles.textInput}
//            placeholder="Your message"
//            onChangeText={(text) => setresearch(text)}
//            value={research}
//          />
//        </View>
//        <ButtonIcon
//          icon={require('../../images/send.png')}
//          onPress={() => {
//            props.onPress(research);
//            setresearch('');
//          }}
//        />
//      </View>
//    </View>
//  );
//}

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

//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(ConversationBar);


const SERVER_URL = 'http://88.165.45.219:3002';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const App = () => {
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    console.log("launch fetch");
    fetch(`${SERVER_URL}/upload`, {
      method: 'POST',
      //headers: new Headers({
      //  'Content-Type': 'application/x-www-form-urlencoded', //Specifying the Content-Type
      //}),
      body: createFormData(photo, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};

export default App;