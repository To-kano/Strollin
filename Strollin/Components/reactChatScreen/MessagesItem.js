import { IP_SERVER, PORT_SERVER } from '../../env/Environement';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import CoursePreviewItem from './CoursePreviewItem';
import ImageItem from './ImageItem';
import CourseItem from './CourseItem';

// import {GetTrackById} from '../APIserver/Track';
//
// import {playAtId} from '../APIsound/play';
// import {remplaceTrack} from '../APIsound/track';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';

// async function SetTrackItem(setTrack, id) {
//  let answer = await GetTrackById(id);
//
//  setTrack(answer);
// }


function MessagesItem(props) {

  
  if (props.profil.id != props.message[props.messageID].expeditor_id) {
    if (props.message[props.messageID]["type"] == "image") {
      
      return (
      <View>
          <ImageItem
            imageId={ props.message[props.messageID].message }
            style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "1%" }}
          />
          <Text style={styles.expeditor} ellipsizeMode="tail">
          {props.profil.friends_pseudo_list[props.message[props.messageID].expeditor_id]}
        </Text>
      </View>
      );
    } else if (props.message[props.messageID]["type"] == "course") {
       <CourseItem navigation={props.navigation} id={props.message[props.messageID].message} pseudo={props.profil.friends_pseudo_list[props.message[props.messageID].expeditor_id]} style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "1%" }}/>
    } else if (props.message[props.messageID]["type"] == "message") {
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
  } else if (props.profil.id == props.message[props.messageID].expeditor_id) {
    if (props.message[props.messageID]["type"] == "image") {
      return (
        <View>
          <ImageItem
            imageId={ props.message[props.messageID].message }
            style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "18%" }}
          />
          <Text style={styles.expeditorUser} ellipsizeMode="tail">
            {props.profil.pseudo}
          </Text>
        </View>
      );
    } else if (props.message[props.messageID]["type"] == "course") {
      return (
       <CourseItem navigation={props.navigation} id={props.message[props.messageID].message} pseudo={props.profil.pseudo} style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "18%" }}/>
      );
    } else if (props.message[props.messageID]["type"] == "message") {
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
