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
import ReturnButton from '../components/ReturnButton';

const globalStyles = require('../../Styles');

function goToMenu(props) {
  props.navigation.navigate('MenuChat');
}

function ChatScreen(props) {
  const {sendMessage} = contextSocket();
  const [name, setName] = useState(props.conversation[props.conversation.currentConversation].name);


  return (
    <View style={[globalStyles.container, {paddingHorizontal: 0, backgroundColor: "#F1F1F2"}]}>
      <View style={{
        width: '100%',
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
          },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingLeft: 96,
        paddingRight: 8,
      }}>
        <Text numberOfLines={1} style={[globalStyles.subtitles, {width: '100%'}]}>{name}</Text>
      </View>

      <FlatList
        data={props.conversation[props.conversation.currentConversation].messages_list}
        contentContainerStyle={{flexDirection: 'column-reverse', paddingVertical: 8, marginVertical: 64}}
        inverted
        style={{backgroundColor: '#f1f1f2', width: "100%"}}
        renderItem={({ item }) => (
          <MessagesItem navigation={props.navigation}
          messageID={item}
          />
          )}
        keyExtractor={(item) => String(item)}
      />
      <ConversationBar
        onPress={sendMessage}
        imagePath="../../images/send.png"
        navigation={props.navigation}
      />
      <ReturnButton onPressFct={() => goToMenu(props)}/>
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
    backgroundColor: '#ffffff',
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
