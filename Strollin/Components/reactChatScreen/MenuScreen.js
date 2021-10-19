import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import ConvPreview from './ConvPreview';
import I18n from '../../Translation/configureTrans';
import SearchBar from './SearchBar';
import Store from '../../Store/configureStore';
import ButtonIcon from './../ButtonIcon.js';
import { IP_SERVER, PORT_SERVER } from '../../env/Environement';
import MenuButton from '../components/MenuButton';
import AddButton from '../components/AddFriendsButton';

const globalStyles = require('../../Styles');

function goToHome(props) {
  props.navigation.navigate('HomePage');
}


function NewConversation(props) {
//console.log('friendlist: ', props.profil.friends_list)
  const action = {type: 'SET_SEARCH_FRIEND_LIST', value: props.profil.friends_list};
  props.dispatch(action);
  props.navigation.navigate('NewConversation');
}

function sortConversation(key) {
  const store = Store.getState();
  let found = false;
  let searchedConv = [];


  if (key == '' || key == store.profil.pseudo) {
    //console.log("nothing in search or self searched");
    const action = {type: 'SET_SEARCH_CONV_LIST', value: store.conversation.conversationList};
    Store.dispatch(action);
  } else {
    for (let i in store.conversation.conversationList) {
      for (let j in store.conversation[store.conversation.conversationList[i]].participants) {
        //console.log("j = ", j);
        //console.log("compared to ", store.profil.friends_pseudo_list[store.conversation[store.conversation.conversationList[i]].participants[j]]);
        if (key == store.profil.friends_pseudo_list[store.conversation[store.conversation.conversationList[i]].participants[j]]) {
          //console.log("FOUND!")
          searchedConv.push(store.conversation.conversationList[i]);
          found = true;
        }
      }
    }
    if (found == false) {
      //console.log("not found in search");
    } else {
      const action = {type: 'SET_SEARCH_CONV_LIST', value: searchedConv};
      Store.dispatch(action);
    }
  }
}

function LoginScreen(props) {
  //console.log('Menu Screen');

  return (
    <View style={[globalStyles.container, {paddingHorizontal: 0}]}>
      <FlatList
        style={{width: '100%'}}
        contentContainerStyle={{ paddingVertical: 96, paddingHorizontal: 16 }}
        data={props.search.searchConvList}
        renderItem={({ item }) => <ConvPreview {...props} conversationID={item} />}
        keyExtractor={(item) => String(item)}
      />
      <SearchBar
        onPress={sortConversation}
      />
      <MenuButton props={props}/>
      <AddButton iconName="add_conversation" onPressFct={() => { NewConversation(props) }}/>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(LoginScreen);

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
