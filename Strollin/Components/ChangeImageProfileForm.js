import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { StyleSheet, Image, Button, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { uploadImageProfile } from '../apiServer/image';
import ImageProfile from './components/ImageProfile';

const globalStyles = require('../Styles');

function ChangeImageProfileForm({ profil, dispatch, modalVisible, setModalVisible }) {

  const [image, setImage] = useState(null);

  const handleChooseImage = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setImage(response);
      }
    });
  };

  return (
    <>
      {image && (
        <View style={{ alignItems: 'center', width: '100%' }}>
          <Image
            source={{ uri: image.uri }}
            style={{ width: 128, height: 128, borderRadius: 16, marginBottom: 32 }}
          />
          <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <TouchableOpacity 
              style={{ backgroundColor: "#ffffff", padding: 16, alignItems: 'center', borderRadius: 32 }}
              onPress={() => { setImage(null) }}
            >
              <Text style={globalStyles.paragraphs}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "#0989FF", padding: 16, alignItems: 'center', borderRadius: 32 }}
              onPress={() => {
                if (image) {
                  uploadImageProfile(profil.access_token, image).then((answer) => {
                    if (answer.image) {
                      const action = { type: 'SET_IMAGE_PROFILE', value: answer.image?.id };
                      dispatch(action);
                    }
                  });
                }
              }}
            >
              <Text style={[globalStyles.paragraphs, { color: '#ffffff' }]}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!image && (
        <View style={{ alignItems: 'center', width: '100%' }} >
          <ImageProfile style={{ width: 128, height: 128, borderRadius: 16, marginBottom: 32 }} />
          <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <TouchableOpacity style={{ backgroundColor: "#ffffff", padding: 16, alignItems: 'center', borderRadius: 32 }} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={globalStyles.paragraphs}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#0989FF", padding: 16, alignItems: 'center', borderRadius: 32 }} onPress={handleChooseImage}>
              <Text style={[globalStyles.paragraphs, { color: '#ffffff' }]}>Choisir une image</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
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

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ChangeImageProfileForm);
//export default ChangeImageProfileForm;