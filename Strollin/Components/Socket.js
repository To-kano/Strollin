import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View } from 'react-native';
import socketIOClient from 'socket.io-client';


const ENDPOINT = 'http://82.226.234.122:3002';

function Socket(props) {
  const [socket, setSocket] = useState(null);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    if (socket != null) {
      socket.on('sendMessage', (data) => {
        console.log(data);
      });
      socket.on('login2', (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  if (socket == null) {
    setSocket(socketIOClient(ENDPOINT));
  } 
  if (socket != null && bool == false) {
    socket.emit('sendMessage', "hey Pierre!");
    setBool(true);
  }

  console.log('ImagePath = ', props.imagePath);
  return (
    <View>
        <TextInput/>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Socket);
