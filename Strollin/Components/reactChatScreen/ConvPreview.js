import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

async function GotoChat(props) {
  console.log('GOING TO CHAT');
  const action = { type: 'SET_CURRENT_CONVERSATION', value: {id: props.conversationID} };
  props.dispatch(action);
  props.navigation.navigate('ScreenChat');
}

function getLastMessage(props) {
  if (props.conversation[props.conversationID].message_list.length > 0) {

    const message_id = props.conversation[props.conversationID].message_list[props.conversation[props.conversationID].message_list.length - 1];

    return (props.message[message_id].message);
  } else {
    return ('No message yet!');
  }
}

function ConvPreview(props) {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => GotoChat(props)}
    >
      <Text style={styles.previewTitle}>
        {  props.conversation[props.conversationID].name}
      </Text>
      <Text style={styles.previewContent}>
        { getLastMessage(props)}
      </Text>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ConvPreview);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  previewTitle: {
    fontWeight: '800',
    fontSize: 20
  },
  previewContent: {
    fontWeight: '300',
    fontSize: 12
  },
});
