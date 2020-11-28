import React, { useState } from 'react';
import { connect } from 'react-redux';

// import {GetTrackById} from '../APIserver/Track';
//
// import {playAtId} from '../APIsound/play';
// import {remplaceTrack} from '../APIsound/track';

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

// async function SetTrackItem(setTrack, id) {
//  let answer = await GetTrackById(id);
//
//  setTrack(answer);
// }

function MessagesItem(props) {
  const [track, setTrack] = useState(null);

  console.log("message item ", props.messageID);

  if (props.profil._id != props.message[props.messageID].expeditor) {
    return (
      <View style={styles.greyDisplay}>
        <View style={styles.box}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {props.message[props.messageID].message}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.blueDisplay}>
      <View style={styles.box}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {props.message[props.messageID].message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  greyDisplay: {
    flex: 1,
    width: '70%',
    borderRadius: 15,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(215, 215, 215, 1)',
  },
  blueDisplay: {
    flex: 1,
    width: '70%',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    marginLeft: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(50, 150, 250, 1)',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(MessagesItem);
