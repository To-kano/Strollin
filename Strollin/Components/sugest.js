import React, { Component } from 'react';
import {Button,Image, View, StyleSheet,Text,ScrollView,FlatList} from 'react-native';
import Arti from './arti'

const blank = '{"Tags": ["Tech"], "Title": "blank","Link": "","Image": "","Desc": "","Source": "","Autor": "","Date": ""}';

export default class Sugest extends Component {


    render() {
        return (
          <View style={styles.cont}>
            
          </View>
        )
    }
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    minWidth: '80%',
    maxWidth: '80%',
    minHeight: '40vh',
    marginTop: '5%',
    marginLeft: '5%'
  },

});
