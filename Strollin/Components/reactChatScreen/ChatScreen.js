import React, { useEffect, useState } from 'react';
import {
  Text, Platform, KeyboardAvoidingView, safeAreaView, FlatList, View, StyleSheet
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
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: "#ffffff", zIndex: 5}}>
        <View style={{ flex: 1 }}>
          <ButtonIcon
            icon={require('../../images/left_arrow.png')}
            onPress={() => {
              goToMenu(props);
            }}
          />
        </View>
        <View style={{ flex: 10 }}>
          <Text style={styles.header}>{name.length > 26 ? name.substring(0, 23) + "..." : name}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View>
          <FlatList ListHeaderComponent={ <View style={{ margin: 30 }} /> }
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
    </View>

  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ChatScreen);

const styles = StyleSheet.create({
  header: {
    paddingLeft: 10,
    fontWeight: '800',
    fontSize: 25,
    color: '#514E5A',
  },
  box: {
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    height: '95 %'
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
