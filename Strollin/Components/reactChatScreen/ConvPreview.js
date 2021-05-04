import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

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

function ConvPreview(props) {
  //console.log("props.conversation[props.conversationID] = ", props.conversation[props.conversationID]);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => GotoChat(props)}
    >
      <Text numberOfLines={1} style={styles.previewTitle}>
        {props.conversation[props.conversationID].name}
      </Text>
      <Text numberOfLines={1} style={styles.previewContent}>
        { getLastMessage(props)}
      </Text>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ConvPreview);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    height: 90,
  },
  previewTitle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 18,
    color: "#000",
  },
  previewContent: {
    color: "#707070",
    fontSize: 12,
  },
});
