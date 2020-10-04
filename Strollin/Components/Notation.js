import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput
} from 'react-native';
import I18n from '../Translation/configureTrans';

function sendMessage(value) {
  console.log('messageSent');
}

function Notation(props) {
  const [value, onChangeValue] = React.useState('');

  return (
    <View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{I18n.t('feedback')}</Text>
        <TextInput
          onChangeText={(text) => onChangeValue(text)}
          value={value}
          style={{ borderWidth: 1 }}
        />
        <Button
          onPress={() => {
            sendMessage(value);
            props.navigation.navigate('HomePage');
          }}
          title={I18n.t('send')}
          color="#841584"
        />
        <View style={{ marginTop: 5 }}>
          <Button
            onPress={() => {
              props.navigation.navigate('HomePage');
            }}
            title={I18n.t('cancel')}
            color="#841584"
          />
        </View>
      </View>
    </View>
  );
}

export default Notation;
