import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import FriendList from './FriendList';
import SearchBar from './SearchBar';
import Store from '../../Store/configureStore';
import ButtonIcon from './../ButtonIcon.js';
import {contextSocket} from '../Socket';

function GotoChat(props, createConversation) {
  if (props.createConversation.conversationParticipants.length > 0) {
    let participants = props.createConversation.conversationParticipants;

    createConversation(participants);
    props.navigation.navigate('MenuChat');
  } else {
    console.log('not enough participants');
  }
}

function sortConversation(key) {
  const store = Store.getState();
  let notFound = true;

  if (key == '') {
    console.log("nothing in search");
  } else {
    for (i in store.profil.friendList) {
      if (key == store.profil.friendList[i]) {
        console.log("found in search");
        notFound = false;
      }
    }
    if (notFound == true) {
      console.log("not found in search");
    }
  }
}

function NewConversation(props) {
  const {createConversation} = contextSocket();

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{ flex: 7 }}>
          <Text style={styles.header}>Friend List</Text>
        </View>
        <View style={{ flex: 1 }}>
          <ButtonIcon
            icon={require('../../images/create_button.png')}
            onPress={() => {
              GotoChat(props, createConversation);
            }}
          />
        </View>
      </View>
      <View>
        <SearchBar
          onPress={sortConversation}
          imagePath="../../images/loupe.svg"
        />
      </View>
      <View>
        <FlatList
          data={props.profil.friends_list}
          renderItem={({ item }) => <FriendList {...props} name={item} />}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(NewConversation);

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
