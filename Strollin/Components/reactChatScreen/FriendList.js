import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Store from '../../Store/configureStore';

async function GotoChat(props) {
  console.log('GOING TO CHAT');
  const store = Store.getState();
  let new_conversation = true;

  for (i in store.conversation.conversationList) {
    if (store.conversation.conversationList[i].usersId.length == 2) {
      for (j in store.conversation.conversationList[i].usersId) {
        if (store.conversation.conversationList[i].usersId[j] == props.name) {
          const action = { type: 'SET_CURRENT_CONVERSATION', value: store.conversation.conversationList[i] };
          props.dispatch(action);
          new_conversation = false;
          break;
        }
      }
    }
  }
  if (new_conversation == true) {
    const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const action = { type: 'ADD_CONVERSATION', value: { id: newId, usersId: [store.profil.Pseudo, props.name], messages: [] } };
    props.dispatch(action);
    const action2 = { type: 'SET_CURRENT_CONVERSATION', value: { id: newId, usersId: [store.profil.Pseudo, props.name], messages: [] } };
    props.dispatch(action2);
    props.navigation.navigate('MenuChat');
  } else {
    props.navigation.navigate('ScreenChat');
  }
}

function FriendList(props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => GotoChat(props)}
    >
      <Text style={styles.previewTitle}>
        { props.name }
      </Text>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(FriendList);

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
