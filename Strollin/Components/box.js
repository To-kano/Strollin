import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList
} from 'react-native';

export default class Box extends Component {
  render() {
    return (
      <View style={{
        justifyContent: 'space-around', flex: 1, marginTop: 20, marginHorizontal: '10%', backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 20, width: '80%'
      }}
      >
        <Text style={[{
          textAlign: 'center', fontSize: 20, color: '#39A5D6', margin: 5
        }]}
        >
          Geek route
        </Text>
        <Text style={[{ textAlign: 'center', fontSize: 25 }]}>Budget : 25€ ~ 30€</Text>
        <Text style={[{ textAlign: 'center', fontSize: 25 }]}>Période : Fin d'après-midi</Text>
        <Text style={[{ textAlign: 'center', fontSize: 25 }]}>1/ Starbucks</Text>
        <Text style={[{ textAlign: 'center', fontSize: 25 }]}>2/ Reset</Text>
        <Text style={[{ textAlign: 'center', fontSize: 25 }]}>3/ Cinéma</Text>
        <Button
        title="Commentaires"
        onPress={() => props.navigation.navigate('Comment')}
      />
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
  },
  whiteBox: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 20,
    marginHorizontal: '10%',
    backgroundColor: 'rgba(255,255,255, 0.9)',
    borderRadius: 20,
    textAlign: "left",
    width: '80%'
  }

});
