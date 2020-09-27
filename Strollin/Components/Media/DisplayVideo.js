import React from 'react';
import {
  View, ActivityIndicator, Dimensions, StyleSheet
} from 'react-native';

import Video from 'react-native-video';

const styles = StyleSheet.create({
  viewImage: {
    alignSelf: 'center',
    margin: 5
  },
  video: {
    width: Dimensions.get('window').width * 70 / 100,
    height: Dimensions.get('window').height * 30 / 100,
  }
});

function DisplayVideo(props) {
  if (!props.data) {
    return (
      <ActivityIndicator />
    );
  }

  return (
    <View style={styles.viewImage}>
      <Video
        source={{ uri: props.data.link }}
        style={styles.video}
        controls
        paused
        repeat
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000
        }}
      />
    </View>
  );
}

export default DisplayVideo;
