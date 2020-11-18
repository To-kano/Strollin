import React, { useEffect, useState, useContext} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View } from 'react-native';
import socketIOClient from 'socket.io-client';
import { createContext } from "react"; 
import Store from '../Store/configureStore';
import profileReducer from '../Store/Reducers/profileReducer';

const SocketContext = createContext(); 
const ENDPOINT = 'http://82.226.234.122:3002';



function Socket({children}) {
  const [socket, setSocket] = useState(null);
  const [bool, setBool] = useState(false);

  const store = Store.getState();

  useEffect(() => {
    if (socket != null) {
      socket.on('sendMessage', (data) => {
        console.log("sent " + data);
      });
      socket.on('chat message', (data) => {
        console.log("received " + data);
      });
      socket.on('id', (data) => {
        console.log("id = ", data);
      });
    }
  }, [socket]);

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

  if (socket == null) {
    setSocket(socketIOClient(ENDPOINT));
  } 
  if (socket != null && bool == false) {
    socket.emit('id', { access_token: store.profil.accessToken });
    socket.emit('sendMessage', "hey Pierre!");
    setBool(true);
  }

  return (
    <SocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
}

export const contextSocket = () => useContext(SocketContext);

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Socket);
