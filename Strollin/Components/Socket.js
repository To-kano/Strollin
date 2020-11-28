import React, { useEffect, useState, useContext} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View } from 'react-native';
import socketIOClient from 'socket.io-client';
import { createContext } from "react"; 
import Store from '../Store/configureStore';
import profileReducer from '../Store/Reducers/profileReducer';

const SocketContext = createContext(); 
const ENDPOINT = 'http://82.226.234.122:3003';

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

  if (!profil.access_token) {
    getProfilCache(dispatch);
    console.log('nav props: ', profil);
  }

  useEffect(() => {
    if (socket != null) {
      socket.on('receiveMessage', (data) => {
        console.log("received " + data);

        const store = Store.getState();
        const action = {
          type: 'ADD_MESSAGE',
          value: data
        };
      
        Store.dispatch(action);
        const action2 = {
          type: 'ADD_MESSAGE_ID',
          value: {
            _id: data.conversation,
            message_id : data._id
          }
        };
        console.log('message =  ', store.message);
      
        Store.dispatch(action2);
        console.log('message 2=  ', store.message);

      });
      socket.on('identification', (data) => {
        console.log("identification = ", data);
      });
      socket.on('newConversation', (data) => {
        //const store = Store.getState();

        console.log("newConversation = ", data);

        const action = { type: 'ADD_CONVERSATION', value: data };
        Store.dispatch(action);
        const action2 = { type: 'RESET_PARTICIPANT_OF_CONVERSATION'};
        Store.dispatch(action2);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (profil.access_token) {
      console.log("access_token = ", profil.access_token);
      socket.emit('login', { access_token: profil.access_token });
      socket.emit('sendMessage', "hey Pierre!");
    }

  }, [profil.access_token])

  const sendMessage = (message) => {
    console.log('sending message ', message);
  
    
    socket.emit('sendMessage', { access_token: store.profil.access_token, 
      conversation: store.conversation.currentConversation, type: "message", message: message});
  };

  const createConversation = (participants) => {
    console.log('creating conversation', participants);
    let convName = store.profil.pseudo;
  
    for (let i in participants) {
      let tmp = ", " + participants[i];
      convName += tmp;
    }
    var object = { access_token: store.profil.access_token, participants: participants, name: convName }
    socket.emit('createConversation', object);
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, createConversation }}>
      {children}
    </SocketContext.Provider>
  );
}

export const contextSocket = () => useContext(SocketContext);

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Socket);
