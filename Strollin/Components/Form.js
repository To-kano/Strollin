import React from 'react';

import { Input } from 'react-native-elements';

import {
  Text, View
} from 'react-native';

function Form({
  style, title, keyboardType, value, onChangeText, placeholder
}) {
  return (
    <View style={style}>
      <Text style={{ color: 'grey' }}>{title}</Text>
      <Input
        autoCapitalize="none"
        keyboardType={keyboardType}
        style={{ marginTop: 200, marginHorizontal: 40, height: 40 }}
        placeholder={placeholder}
        value={value}
        onChangeText={(valueText) => {
          onChangeText(valueText);
        }}
      />
    </View>
  );
}

export default Form;
