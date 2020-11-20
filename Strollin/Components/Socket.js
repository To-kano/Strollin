import React, { useEffect, useState, useContext} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View } from 'react-native';
import socketIOClient from 'socket.io-client';
import { createContext } from "react"; 
import Store from '../Store/configureStore';
import profileReducer from '../Store/Reducers/profileReducer';

const SocketContext = createContext(); 
const ENDPOINT = 'http://82.226.234.122:3002';

import AsyncStorage from '@react-native-community/async-storage';


const getProfilCache = async (dispatch) => {
  try {
    let jsonValue = await AsyncStorage.getItem('cache_profile');

    if (jsonValue) {
      jsonValue = JSON.parse(jsonValue);

      const action = { type: 'SET_USER', value: jsonValue };
      dispatch(action);
    }
  } catch (e) {
    console.log('echec store profile ', e);
  }
};


function Socket({children, profil, dispatch}) {
  const [socket, setSocket] = useState(null);

  const store = Store.getState();

  if (socket == null) {
    setSocket(socketIOClient(ENDPOINT));
  } 

  if (!profil.accessToken) {
    getProfilCache(dispatch);
    console.log('nav props: ', profil);
  }

  useEffect(() => {
    if (socket != null) {
      socket.on('sendMessage', (data) => {
        console.log("sent " + data);
      });
      socket.on('receiveMessage', (data) => {
        console.log("received " + data);
      });
      socket.on('login', (data) => {
        console.log("login = ", data);
      });
      socket.on('newConversation', (data) => {
      //  const store = Store.getState();
      //  let new_conversation = true;
      //
      //  for (i in store.conversation.conversationList) {
      //    if (store.conversation.conversationList[i].usersId.length == 2) {
      //      for (j in store.conversation.conversationList[i].usersId) {
      //        if (store.conversation.conversationList[i].usersId[j] == props.name) {
      //          const action = { type: 'SET_CURRENT_CONVERSATION', value: store.conversation.conversationList[i] };
      //          props.dispatch(action);
      //          new_conversation = false;
      //          break;
      //        }
      //      }
      //    }
      //  }
      //  if (new_conversation == true) {
      //    const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      //
      //    //create
      //    const action = { type: 'ADD_CONVERSATION', value: { id: newId, usersId: [store.profil.pseudo, props.name], messages: [] } };
      //    props.dispatch(action);
      //    const action2 = { type: 'SET_CURRENT_CONVERSATION', value: { id: newId, usersId: [store.profil.pseudo, props.name], messages: [] } };
      //    props.dispatch(action2);
      //  }
      console.log("newConnection = ", data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (profil.accessToken) {
      console.log("access_token = ", profil.accessToken);
      socket.emit('login', { access_token: profil.accessToken });
      socket.emit('sendMessage', "hey Pierre!");
    }

  }, [profil.accessToken])

  const sendMessage = (message) => {
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
    socket.emit('sendMessage', message);
  };

  const createConversation = (message) => {
    console.log('creating conversation', message);
  
    var object = { access_token: store.profil.accessToken, participants: "", groupName: "" }
    socket.emit('createConversation', object);
  };

  //if (socket != null) {
  //  console.log("access_token = ", store.profil.accessToken);
  //  socket.emit('id', { access_token: store.profil.accessToken });
  //  socket.emit('sendMessage', "hey Pierre!");
  //}

  return (
    <SocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
}

export const contextSocket = () => useContext(SocketContext);

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Socket);
