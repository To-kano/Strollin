import React, { Component } from 'react';
import {Button,Image, View, StyleSheet,Text,ScrollView,FlatList} from 'react-native';


export default class Box extends Component {

    render() {
      return (
        <View style={styles.cont}>
          <Image style={styles.img} source={require('../ressources/plum.jpg')} />
          <Text style={styles.text}> Trip exemple </Text>
        </View>
      )}
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  text: {
    fontSize: 22,
    marginBottom: 5,
    opacity: 0.5
  },
  img: {
    resizeMode: 'stretch',
  }
});
