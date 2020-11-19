import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import ConvPreview from './ConvPreview';
import SearchBar from './SearchBar';
import Store from '../../Store/configureStore';
import ButtonIcon from '../ButtonIcon.js';

function NewConversation(props) {
  props.navigation.navigate('NewConversation');
}

async function setUser() {
  const action = {
    type: 'SET_USER',
    value: {
      firstName: 'Tony',
      lastName: 'Ye',
      email: 'tony.ye@epitech.eu',
      pseudo: 'Kano',
      friendList: ['Koko', 'Yaya', 'Zaza'],
    }
  };
  Store.dispatch(action);
}

async function setHistoric() {
  const data = [{
    id: 'convIdTEST',
    usersId: ['Kano', 'Koko'],
    messages: [{
      id: 'llllllqq', content: 'Hello', userId: 'userId1TEST', username: 'Kano'
    },
    {
      id: 'ldfsfdealqq', content: 'World', userId: 'userId2TEST', username: 'Koko'
    }]
  },

  {
    id: 'convIdTEST2',
    usersId: ['Kano', 'Yaya', 'Zaza'],
    messages: [
      {
        id: 'llkejfzqq', content: 'MUDA MUDA MUDA MUDA!', userId: 'userId2TEST3', username: 'Zaza'
      },
      {
        id: 'jbfkjzdz', content: 'ZA', userId: 'userId1TEST2', username: 'Kano'
      },
      {
        id: 'llkejfzqq', content: 'WARUDO!', userId: 'userId2TEST2', username: 'Yaya'
      }]
  }];

  const action = { type: 'SET_CONVERSATION', value: data };
  Store.dispatch(action);
}

function sortConversation(key) {
  const store = Store.getState();
  //const result = titleFilter(store.conversation.conversationList.id);
  var notFound = false;

  var action = { type: 'SET_FRIEND', value: { friendList: ['Koko', 'Yaya', 'Zaza'] } };

  if (key == '') {
    Store.dispatch(action);
  } else {
    for (i in store.profil.friendList) {
      if (key == store.profil.friendList[i]) {
        action = { type: 'SET_FRIEND', value: { friendList: [key] } };
        Store.dispatch(action);
        notFound = false;
      }
    }
    if (notFound == true) {
      action = { type: 'SET_FRIEND', value: { friendList: [] } };
      Store.dispatch(action);
    }
  }

  // result = liste triée
}

function LoginScreen(props) {
  console.log('Menu Screen');
  if (props.profil.friendList.length == 0) {
    setUser();
    /* return (
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.header}>Discussions            </Text>
          <ButtonIcon
            icon={require('../../images/plus.png')}
            onPress={() => {
              NewConversation(props);
            }}
          />
        </View>
        <View>
          <Text style={styles.header}>Charging messages</Text>
        </View>
      </View>
    ); */
  }
  if (props.conversation.conversationList.length < 1) {
    setHistoric();
    /* return (
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.header}>Discussions            </Text>
          <ButtonIcon
            icon={require('../../images/plus.png')}
            onPress={() => {
              NewConversation(props);
            }}
          />
        </View>
        <View>
          <Text style={styles.header}>Charging messages</Text>
        </View>
      </View>
    ); */
  }

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.header}>Discussions            </Text>
        <ButtonIcon
          icon={require('../../images/plus.png')}
          onPress={() => {
            NewConversation(props);
          }}
        />
      </View>
      <View>
        <SearchBar
          onPress={sortConversation}
          imagePath="../../images/loupe.png"
        />
      </View>
      <View>
        <FlatList
          data={props.conversation.conversationList}
          renderItem={({ item }) => <ConvPreview {...props} jsonConversation={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
// <TextInput
//    style={ styles.input }
//    placeholder="Name"
//    onChangeText={ name => {
//        setName(name);
//    }}
//    value={ name }
/// >

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7'
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#FFF',
    position: 'absolute',
    left: -120,
    top: -20
  },
  header: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 30,
    color: '#514E5A',
  },
  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BAB7C3',
    borderRadius: 30,
    paddingHorizontal: 16,
    color: '#514E5A',
    fontWeight: '600'
  },
  continuation: {
    width: 50,
    height: 50,
    backgroundColor: '#434343'
  }
});
