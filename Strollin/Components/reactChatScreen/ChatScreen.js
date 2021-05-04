import React, { useEffect, useState } from 'react';
import {
  Text, Platform, KeyboardAvoidingView, safeAreaView, FlatList, View, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import ConversationBar from './ConversationBar';
import MessagesItem from './MessagesItem';
import Store from '../../Store/configureStore';
import profileReducer from '../../Store/Reducers/profileReducer';
import {contextSocket} from '../Socket';
import ButtonIcon from './../ButtonIcon.js';

function goToMenu(props) {
  props.navigation.navigate('MenuChat');
}

function ChatScreen(props) {
  const {sendMessage} = contextSocket();
  const [name, setName] = useState(props.conversation[props.conversation.currentConversation].name);


  return (
    <View
      style={styles.view_chatScreen}
    >
      <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => { goToMenu(props); }}
        >
          <Image style={styles.img_header} source={require('../../images/icons/black/return.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {name.length > 11 ? name.substring(0, 11) + ".." : name}{'    '}
        </Text>
      </View>
      <View style={styles.view_list}>
          <FlatList
            data={props.conversation[props.conversation.currentConversation].messages_list}
            renderItem={({ item }) => (
              <MessagesItem navigation={props.navigation}
              messageID={item}
              />
            )}
            keyExtractor={(item) => String(item)}
          />
      </View>
      <ConversationBar
        onPress={sendMessage}
        imagePath="../../images/send.png"
        navigation={props.navigation}
      />
    </View>

  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ChatScreen);

const styles = StyleSheet.create({
  view_chatScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '3.3%',
    paddingRight: '3.3%',
    paddingBottom: '0%',
  },
  view_header: {
    flex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
  text_header: {
    width: '87.6%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#000000',
  },
  view_list: {
    flex: 707,
    width: '100%',
  },
});
