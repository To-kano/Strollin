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
            style={{ width: 300, height: 300, borderRadius: 12, marginLeft: "1%" }}
          />
          <Text style={styles.expeditor} ellipsizeMode="tail">
          {props.profil.friends_pseudo_list[props.message[props.messageID].expeditor_id]}
        </Text>
      </View>
      );
    } else if (props.message[props.messageID]["type"] == "course") {
      return (
      <View>
        <CourseItem navigation={props.navigation} id={props.message[props.messageID].message} pseudo={props.profil.friends_pseudo_list[props.message[props.messageID].expeditor_id]} style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "1%", backgroundColor: '#fff' }}/>
        <Text style={styles.expeditor} ellipsizeMode="tail">
          {props.profil.friends_pseudo_list[props.message[props.messageID].expeditor_id]}
        </Text>
      </View>
      );
    } else if (props.message[props.messageID]["type"] == "message") {
      return (
        <View>
          <View style={styles.view_message}>
            <View style={styles.greyDisplay}>
                <Text style={styles.messageGrey}>
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
        <View>
          <CourseItem navigation={props.navigation} id={props.message[props.messageID].message} pseudo={props.profil.pseudo} style={{ width: 300, height: 300, borderRadius: 15, marginLeft: "18%", backgroundColor: '#fff' }}/>
          <Text style={styles.expeditorUser} ellipsizeMode="tail">
            {props.profil.pseudo}
          </Text>
        </View>
      );
    } else if (props.message[props.messageID]["type"] == "message") {
      return (
        <View>
          <View style={styles.view_message_mine}>
            <View style={styles.blueDisplay}>
                <Text style={styles.messageBlue}>
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
  view_message: {
    justifyContent: 'flex-start', flexDirection: 'row',
  },
  view_message_mine: {
    justifyContent: 'flex-start', flexDirection: 'row-reverse',
  },
  greyDisplay: {
    maxWidth: '77%',
    borderRadius: 22,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  blueDisplay: {
    maxWidth: '77%',
    borderRadius: 22,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#0092A7',
    alignItems: 'flex-end',
  },
  messageGrey: {
    fontSize: 16,
    color: '#000',
  },
  messageBlue: {
    fontSize: 16,
    color: '#fff',
  },
  expeditor: {
    fontSize: 10,
    marginLeft: 5,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: "left",
  },
  expeditorUser: {
    fontSize: 10,
    marginRight: 5,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: "right",
  },
  icon: {
    width: "20%",
    height: "20%",
    resizeMode: 'contain',
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(MessagesItem);
