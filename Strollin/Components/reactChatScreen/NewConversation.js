import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import I18n from '../../Translation/configureTrans';
import FriendList from './FriendList';
import SearchBar from './SearchBar';
import Store from '../../Store/configureStore';
import ButtonIcon from './../ButtonIcon.js';
import {contextSocket} from '../Socket';

function goToMenu(props) {
  props.navigation.navigate('MenuChat');
}

function GotoChat(props, createConversation) {
  if (props.createConversation.conversationParticipants.length > 0) {
    let participants = props.createConversation.conversationParticipants;
    const action = {type: 'SET_SEARCH_CONV_LIST', value: props.conversation.conversationList };
    props.dispatch(action);
    
    createConversation(participants);

    props.navigation.navigate('MenuChat');
  } else {
    //console.log('not enough participants');
  }
}

function sortConversation(key) {
  const store = Store.getState();
  let found = false;

  if (key == '') {
    //console.log("nothing in search");
    const action = {type: 'SET_SEARCH_FRIEND_LIST', value: store.profil.friends_list};
    Store.dispatch(action);
  } else {
    for (let i in store.profil.friends_list) {
      if (key == store.profil.friends_pseudo_list[store.profil.friends_list[i]]) {
        const action = {type: 'SET_SEARCH_FRIEND_LIST', value: [store.profil.friends_list[i]]};
        Store.dispatch(action);
        found = true;
        break;
      }
    }
    if (found == false) {
      //console.log("not found in search");
    }
  }
}

export function Header({ props, defaultState = false }) {
  const {createConversation} = contextSocket();

  return (
    <View style={styles.view_header}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        // onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Image style={styles.img_header} source={require('../../images/icons/black/return.png')} />
      </TouchableOpacity>
      <Text style={styles.text_header}>
        {I18n.t('Header.friend_list')}
      </Text>
      <TouchableOpacity
        onPress={() => { GotoChat(props, createConversation); }}
      >
        <Image style={styles.img_header} source={require('../../images/create_button.png')} />
      </TouchableOpacity>
    </View>
  );
}

function NewConversation(props) {
  return (
    <View style={styles.view_back}>
      <Header props={props} />
      <SearchBar
        onPress={sortConversation}
      />
      <View style={styles.view_list}>
        <FlatList
          data={props.search.searchFriendList}
          renderItem={({ item }) => <FriendList {...props} id={item} />}
          keyExtractor={(item) => String(item)}
        />
      </View>
    </View>
    // <View style={styles.container}>
    //   <View style={styles.circle} />
    //   <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: "#ffffff"}}>
    //     <View style={{ flex: 1 }}>
    //       <ButtonIcon
    //         icon={require('../../images/left_arrow.png')}
    //         onPress={() => {
    //           goToMenu(props);
    //         }}
    //       />
    //     </View>
    //     <View style={{ flex: 7 }}>
    //       <Text style={styles.header}>Friend List</Text>
    //     </View>
    //     <View style={{ flex: 1 }}>
    //       <ButtonIcon
    //         icon={require('../../images/create_button.png')}
    //         onPress={() => {
    //           GotoChat(props, createConversation);
    //         }}
    //       />
    //     </View>
    //   </View>
    //   <View style={{backgroundColor: "#ffffff"}}>
    //     <SearchBar
    //       onPress={sortConversation}
    //     />
    //   </View>
    //   <View>
    //     <FlatList
    //       data={props.search.searchFriendList}
    //       renderItem={({ item }) => <FriendList {...props} id={item} />}
    //       keyExtractor={(item) => String(item)}
    //     />
    //   </View>
    // </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(NewConversation);

const styles = StyleSheet.create({
  view_back: {
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
  textInput_header: {
    height: 40,
    width: '85%',
    borderRadius: 21,
    marginRight: 12.5,
    paddingLeft: 12.5,
    backgroundColor: '#FFFFFF',
  },
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
  text_header: {
    width: '77.8%',
    // width: '87.6%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  view_list: {
    flex: 697,
    width: '100%',
  }
  // container: {
  //   flex: 1,
  //   backgroundColor: '#F4F5F7'
  // },
  // circle: {
  //   width: 500,
  //   height: 500,
  //   borderRadius: 500 / 2,
  //   backgroundColor: '#FFF',
  //   position: 'absolute',
  //   left: -120,
  //   top: -20
  // },
  // header: {
  //   textAlign: 'center',
  //   fontWeight: '800',
  //   fontSize: 30,
  //   color: '#514E5A',
  // },
  // input: {
  //   marginTop: 32,
  //   height: 50,
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderColor: '#BAB7C3',
  //   borderRadius: 30,
  //   paddingHorizontal: 16,
  //   color: '#514E5A',
  //   fontWeight: '600'
  // },
  // continuation: {
  //   width: 50,
  //   height: 50,
  //   backgroundColor: '#434343'
  // }
});
