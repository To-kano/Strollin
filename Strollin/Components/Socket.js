import React, { useEffect, useState, useContext} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View } from 'react-native';
import socketIOClient from 'socket.io-client';
import { createContext } from "react";
import Store from '../Store/configureStore';
import profileReducer from '../Store/Reducers/profileReducer';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';

const SocketContext = createContext();
const ENDPOINT = `http://${IP_SERVER}:${PORT_SERVER}`;//3000 pour Tony
import AsyncStorage from '@react-native-community/async-storage';



export async function getProfilCache(dispatch) {
  try {
    let jsonValue = await AsyncStorage.getItem('cache_profile');

    if (jsonValue) {
      jsonValue = JSON.parse(jsonValue);

      const action = { type: 'SET_USER', value: jsonValue };
      dispatch(action);
    }
  } catch (e) {
  //console.log('echec store profile ', e);
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
    //console.log('nav props: ', profil);
  }

  useEffect(() => {
    if (socket != null) {
      socket.on('receiveMessage', (data) => {
    //console.log("received msg" + JSON.stringify(data));

      const action = { type: 'ADD_MESSAGE', value: data };
      Store.dispatch(action);

      const action2 = {
        type: 'ADD_MESSAGE_ID',
        value: { id: data.conversation, message_id : data.id}
      };
      Store.dispatch(action2);

      });
      socket.on('identification', (data) => {
        //console.log("identification = ", data);
      });
      socket.on('newConversation', (data) => {
        const store = Store.getState();

        const action = { type: 'ADD_CONVERSATION', value: data };
        Store.dispatch(action);
        const action2 = { type: 'RESET_PARTICIPANT_OF_CONVERSATION'};
        Store.dispatch(action2);
        const action3 = { type: 'ADD_TO_SEARCH_CONV', value: data };
        Store.dispatch(action3);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (profil.access_token) {
      //console.log("access_token = ", profil.access_token);
      socket.emit('login', { access_token: profil.access_token });
      socket.emit('sendMessage', "hey Pierre!");
    }

  }, [profil.access_token])

  const sendMessage = (message) => {
    //console.log('sending message ', message);


    socket.emit('sendMessage', { access_token: store.profil.access_token,
      conversation: store.conversation.currentConversation, type: "message", message: message});
  };

  const sendImage = (image) => {
  //console.log('sending image', image);

    socket.emit('sendMessage', { access_token: store.profil.access_token,
      conversation: store.conversation.currentConversation, type: "image", message: image});
  };

  const sendCourse = (courseId) => {
  //console.log('sending course', courseId);

    socket.emit('sendMessage', { access_token: store.profil.access_token,
      conversation: store.conversation.currentConversation, type: "course", message: courseId});
  };

  const createConversation = (participantsID) => {
  //console.log('creating conversation', participantsID);
    let convName = store.profil.pseudo;

    for (let i in participantsID) {
      let tmp = ", " + store.profil.friends_pseudo_list[participantsID[i]];
      convName += tmp;
    }
    var object = { access_token: store.profil.access_token, participants: participantsID, name: convName }
    socket.emit('createConversation', object);
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, createConversation, sendImage, sendCourse }}>
      {children}
    </SocketContext.Provider>
  );
}

export const contextSocket = () => useContext(SocketContext);

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Socket);
