import React, { Component } from 'react';
import {Button,Image, View, StyleSheet,Text,ScrollView,FlatList, TextInput} from 'react-native';

function sendMessage(value) {
  console.log('messageSent')
}

function Notation (props){
  const [value, onChangeValue] = React.useState('Useless Placeholder');

  return (
    <View >
      <View>
        <Text style={{fontSize: 20,fontWeight: "bold", textAlign: "center"}}>give us a feedback</Text>
        <TextInput
          onChangeText={text => onChangeValue(text)}
          value={value}
          style={{borderWidth: 1}}
        />
        <Button
          onPress={() => {
            sendMessage(value)
            props.navigation.navigate('HomePage');
          }}
          title="Send"
          color="#841584"
        />
        <View style={{marginTop:5}}>
        <Button
          onPress={() => {
            props.navigation.navigate('HomePage');
          }}
          title="Cancel"
          color="#841584"
        />
        </View>
      </View>
    </View>
  )
}

export default Notation

const styles = StyleSheet.create({
  cont: {
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    backgroundColor: '#FFC300'
  },
  img: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    backgroundColor: 'red',
    width: '80%'
  }

});
