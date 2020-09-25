import React, { useState, useEffect } from 'react';

import { Input } from 'react-native-elements';

import {
  StyleSheet, Text, View, Button, ImageBackground, TextInput, ActivityIndicator
} from 'react-native';

function Form(props) {
  // const [data, setData] = useState(props.value);

  return (
    <View style={props.style}>
      <Text style={{ color: 'grey' }}>{props.title}</Text>
      <Input
        autoCapitalize="none"
        keyboardType={props.keyboardType}
        style={{ marginTop: 200, marginHorizontal: 40, height: 40 }}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(valueText) => {
          // setData(valueText);
          props.onChangeText(valueText);
        }}
      />
    </View>
  );
}

export default Form;
