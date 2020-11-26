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
import {contextSocket} from '../Socket';

function ChatScreen(props) {
  const {sendMessage} = contextSocket();

  console.log("ChatScreen data = ", props.conversation[props.conversation.currentConversation].message_list );
  console.log("ChatScreen data = ", props.conversation.currentConversation );

  return (
    <View style={styles.box}>
      <View>
        <FlatList
          data={props.conversation[props.conversation.currentConversation].message_list}
          renderItem={({ item }) => (
            <MessagesItem
            messageID={item}
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
