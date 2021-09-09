import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TextInput,
} from 'react-native';

function InputSetting({title, text, value, setValue}) {

    return (
        <View style={styles.view_option}>
          <Text style={styles.text_option}>
            {title}
          </Text>
          <View style={styles.view_separator} />
          <View style={styles.view_optionInput}>
            <TextInput
              autoCapitalize={'none'}
              style={styles.textInput_optionInput}
              keyboardType="numeric"
              onChangeText={(text) => setValue(text)}
              value={value}
              maxLength={6}
            />
            <Text style={styles.text_optionInput}>
              {text}
            </Text>
          </View>
        </View>
    )
}

export default InputSetting;

const styles = StyleSheet.create({
    view_option: {
      marginTop: 30,
      flexDirection: 'column',
    },
    text_option: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
    },
    view_optionInput: {
      marginTop: 5,
      marginBottom: 5,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
    },
    textInput_optionInput: {
      flex: 270,
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: 5,
      borderRadius: 4,
      backgroundColor: '#ffffff',
    },
    text_optionInput: {
      flex: 76,
      marginLeft: 5,
      fontWeight: 'bold',
      fontSize: 16,
      color: '#000000',
    },
    view_separator: {
      height: 3,
      marginTop: 2,
      marginBottom: 5,
      borderRadius: 2,
      width: '100%',
      backgroundColor:'#0092A7',
    },
  });
  