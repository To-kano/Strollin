import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View } from 'react-native';
import socketIOClient from 'socket.io-client';

import ButtonIcon from './ButtonIcon.js';

const ENDPOINT = 'http://82.226.234.122:2000';

function ConversationBar(props) {
  const [research, setresearch] = useState('');
  const { imagePath } = props;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket != null) {
      socket.on('chat message', (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  if (socket == null) {
    setSocket(socketIOClient(ENDPOINT));
  }

  console.log('ImagePath = ', props.imagePath);
  return (
    <View style={styles.container}>
      <View style={styles.horizontalDisplay}>
        <ButtonIcon
          icon={require('../../images/picture.png')}
          onPress={() => {
            props.onPress(research, socket);
            setresearch('');
          }}
        />
        <View style={styles.box}>
          <TextInput
            style={styles.textInput}
            placeholder="Your message"
            onChangeText={(text) => setresearch(text)}
            value={research}
          />
        </View>
        <ButtonIcon
          icon={require('../../images/send.png')}
          onPress={() => {
            props.onPress(research, socket);
            setresearch('');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  box: {
    flex: 1,
  },
  horizontalDisplay: {
    width: '97 %',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ConversationBar);
