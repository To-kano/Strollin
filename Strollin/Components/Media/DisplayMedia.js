import React from 'react';
import {
  Image, View, ActivityIndicator, Dimensions, StyleSheet
} from 'react-native';

import DisplayImage from './Image';
import DisplayVideo from './DisplayVideo';

const styles = StyleSheet.create({
  viewImage: {
    alignSelf: 'center',
    margin: 5
  },
  image: {
    width: Dimensions.get('window').width * 70 / 100,
    height: Dimensions.get('window').height * 30 / 100,
    resizeMode: 'contain'
  }
});

function DisplayMedia(props) {
  if (!props.data) {
    return (
      <ActivityIndicator />
    );
  }

  const { type } = props.data;

  if (type === 'image/jpeg' || type === 'image/png' || type === 'image/gif') {
    return (
      <DisplayImage
        data={props.data}
      />
    );
  }

  if (type == 'video/mp4') {
    return (
      <DisplayVideo
        data={props.data}
      />
    );
  }

  return (
    <View style={styles.viewImage}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://www.tux-usb.com/images/404.png'
        }}
      />
    </View>
  );
}

export default DisplayMedia;
