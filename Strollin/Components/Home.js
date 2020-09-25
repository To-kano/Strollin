import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, FlatList, Button, ImageBackground, StyleSheet, Dimensions
} from 'react-native';
// import stylesHomepage from '../../styles/homepage'
// import stylesGeneric from '../../styles/genericStyle'
// import { RondFormeText } from "../../features/geoForme/rondForm"

import { connect } from 'react-redux';

function Home(props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={[{ flex: 1, backgroundColor: 'white' }]} />
      <View style={{ flex: 1.5, marginHorizontal: '35%', backgroundColor: 'white' }}>
        <Button
          title="historic"
          color="#89B3D9"
          onPress={() => props.navigation.navigate('historicUser')}
        />
        <Button
          title="Log Out"
          color="#89B3D9"
          onPress={() => props.navigation.navigate('userLogin')}
        />
      </View>
      <View style={[{ flex: 0.5, backgroundColor: 'white', justifyContent: 'center' }]}>
        <Button
          color="#D99860"
          title="New Trip"
          onPress={() => props.navigation.navigate('TripSuggestion')}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: "gray"
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "gray"
  }
});
