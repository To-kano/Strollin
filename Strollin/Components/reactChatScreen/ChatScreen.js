import React, { useEffect, useState } from 'react';
import {
  Platform, KeyboardAvoidingView, safeAreaView, FlatList, View, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import ConversationBar from './ConversationBar';
import MessagesItem from './MessagesItem';
import Store from '../../Store/configureStore';
import profileReducer from '../../Store/Reducers/profileReducer';

function getHistoric(props) {
  const tmp = [];

  console.log('lol', props.conversation.currentConversation.messages);

  for (let i = 0; i < props.conversation.currentConversation.messages.length; i++) {
    tmp.push(props.conversation.currentConversation.messages[i].content);
  }
  return (tmp);
}

function sendMessage(message, socket) {
  console.log('sending message ', message);

  const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const store = Store.getState();
  const action = {
    type: 'ADD_MESSAGE_TO_CONVERSATION',
    value: {
      id: newId, content: message, userId: store.profil.Id, username: store.profil.pseudo
    }
  };
  console.log('Pseudo =  ', store.profil.pseudo);

  Store.dispatch(action);
  socket.emit('chat message', message);
}

function ChatScreen(props) {
  //const [messages, setMessages] = useState([getHistoric(props)]);

  return (
    <View style={styles.box}>
      <View>
        <FlatList
          data={props.conversation.currentConversation.messages}
          renderItem={({ item }) => (
            <MessagesItem
              message={item.content}
              username={item.username}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
      <ConversationBar
        onPress={sendMessage}
        imagePath="../../images/send.png"
      />
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ChatScreen);

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    height: '100 %'
  },
  horizontalDisplay: {
    width: '100 %',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(215, 215, 215, 1)',
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
