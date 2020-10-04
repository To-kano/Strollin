import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

async function GotoChat(props) {
  console.log('GOING TO CHAT');
  const action = { type: 'SET_CURRENT_CONVERSATION', value: props.jsonConversation };
  props.dispatch(action);
  props.navigation.navigate('ScreenChat');
}

function getUser(props) {
  let tmp = '';
  let j = false;

  for (i in props.jsonConversation.usersId) {
    if (j == true) {
      tmp = `${tmp}, `;
    }
    if (props.jsonConversation.usersId[i] != props.profil.Pseudo) {
      tmp += props.jsonConversation.usersId[i];
      j = true;
    }
  }
  return (tmp);
}

function getLastMessage(props) {
  if (props.jsonConversation.messages.length > 0) {
    return (props.jsonConversation.messages[props.jsonConversation.messages.length - 1].content);
  }
  return ('No message yet!');
}

function ConvPreview(props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => GotoChat(props)}
    >
      <Text style={styles.previewTitle}>
        { getUser(props) }
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
