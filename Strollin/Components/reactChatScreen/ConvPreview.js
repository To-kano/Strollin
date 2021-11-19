import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import Icon from '../components/Icon';
import {getUserProfile} from '../../apiServer/user';
import ImageUser from '../components/ImageUser';

const globalStyles = require('../../Styles');

async function GotoChat(props) {
  //console.log('GOING TO CHAT');
  const action = { type: 'SET_CURRENT_CONVERSATION', value: {id: props.conversationID} };
  props.dispatch(action);
  props.navigation.navigate('ScreenChat');
}

function getLastMessage(props) {

  if (props.conversation[props.conversationID].messages_list.length > 0) {

    const message_id = props.conversation[props.conversationID].messages_list[props.conversation[props.conversationID].messages_list.length - 1];

    if (props.message[message_id].type == "message") {
      return (props.message[message_id].message);
    } else if (props.message[message_id].type == "image") {
      if (props.message[message_id].expeditor_id == props.profil.id) {
        return ("You sent an image!");
      } else if (props.message[message_id].expeditor_id != props.profil.id) {
        return (props.profil.friends_pseudo_list[props.message[message_id].expeditor_id] + " sent an image!")
      }
    } else if (props.message[message_id].type == "course") {
      if (props.message[message_id].expeditor_id == props.profil.id) {
        return ("You sent a course!");
      } else if (props.message[message_id].expeditor_id != props.profil.id) {
        return (props.profil.friends_pseudo_list[props.message[message_id].expeditor_id] + " sent a course!")
      }
    }
  } else {
    return ('No message yet!');
  }
}

function getOhterParticipantId(arrayParticipantId, UserId) {
  return arrayParticipantId.filter((id) => {
    return id != UserId;
  })
}

function ConvPreview(props) {

  const [profile, setProfile] = useState({});

  useEffect(() => {

    const otherParticipant = getOhterParticipantId(props.conversation[props.conversationID].participants , props.profil.id);

    if (otherParticipant.length > 0) {
      const userId = null;
      getUserProfile(props.profil.access_token, otherParticipant[0]).then((result) => (setProfile(result)));
    }

  }, [props.conversation[props.conversationID].participants])


  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => GotoChat(props)}
    >
      {props.conversation[props.conversationID].participants.length === 2 ?
        <ImageUser
          style={{height: 64, width: 64, borderRadius: 16, marginRight: 16}}
          user={profile}
        />
      :
        <Image
          style={{height: 64, width: 64, borderRadius: 16, marginRight: 16}}
          source={require('../../assets/images/default_group_picture.png')}
        />
      }
      <View>
        <Text numberOfLines={1} style={globalStyles.paragraphs}>
          {props.conversation[props.conversationID].name}
        </Text>
        <Text numberOfLines={1} style={[globalStyles.subparagraphs, {color: '#9B979B'}]}>
          { getLastMessage(props)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ConvPreview);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
  },
});
