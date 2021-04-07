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
  const [isImage, setIsImage] = useState(false);

  if (props.profil.id != props.message[props.messageID].expeditor_id) {
    if (isImage) {
      console.log("");
    } else {
      return (
      <View>
        <View style={styles.greyDisplay}>
          <View style={styles.box}>
            <Text style={styles.message}>
              {props.message[props.messageID].message}
            </Text>
          </View>
        </View>
        <Text style={styles.expeditor} ellipsizeMode="tail">
          {props.profil.friends_pseudo_list[props.message[props.messageID].expeditor_id]}
        </Text>
      </View>
      );
    }
  }
  if (isImage) {
    console.log("");
  } else {
    return (
      <View>
        <View style={styles.blueDisplay}>
          <View style={styles.box}>
            <Text style={styles.message}>
              {props.message[props.messageID].message}
            </Text>
          </View>
        </View>
        <Text style={styles.expeditorUser} ellipsizeMode="tail">
          {props.profil.pseudo}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  greyDisplay: {
    flex: 1,
    width: '70%',
    borderRadius: 15,
    padding: 10,
    marginLeft: "1%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(215, 215, 215, 1)',
  },
  blueDisplay: {
    flex: 1,
    width: '70%',
    borderRadius: 15,
    padding: 10,
    marginLeft: "30%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(50, 150, 250, 1)',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 16,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expeditor: {
    fontSize: 10,
    marginLeft: "4%"
  },
  expeditorUser: {
    fontSize: 10,
    textAlign: "right",
    marginRight: "4%"

  },
  icon: {
    width: "20%",
    height: "20%",
    resizeMode: 'contain',
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(MessagesItem);
