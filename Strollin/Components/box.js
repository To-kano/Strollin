import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList
} from 'react-native';

export default class Box extends Component {
  render() {
    return (
      <View style={styles.cont}>
        <Text style={{ fontSize: 40 }}> Trending trip: </Text>
        <View style={styles.cont}>
          <Image style={{ resizeMode: 'stretch' }} source={require('../ressources/plum2.jpg')} />
        </View>
      </View>
    );
  }
}

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
