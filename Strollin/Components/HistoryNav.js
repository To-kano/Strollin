import React, { Component } from 'react';
import { Text, View, TouchableHighlight, FlatList, Button, ImageBackground, StyleSheet, Dimensions } from 'react-native';
//import stylesHomepage from '../../styles/homepage'
//import stylesGeneric from '../../styles/genericStyle'
//import { RondFormeText } from "../../features/geoForme/rondForm"

import ElementHistoryNav from './HistoryElement';

import {connect} from 'react-redux';


function HistoryNav(props) {

  console.log("historic ", props.map.historic[0]);

  return (
    <View style={{ flex: 1 }}>
        <View style={{ flex: 1.5, marginHorizontal: "15%" , backgroundColor : "white"}}>
        <FlatList
            data={props.map.historic}
            renderItem={({ item }) => (
              <View>
                <Text>date: {item.date}</Text>
                <Text>duration: {item.duration}</Text>
                <ElementHistoryNav data={item.waypoints} />
              </View>
            )}
          />
        
          
        </View>
        <View style={[{ flex: 0.3, backgroundColor : "white" , justifyContent : "center"}]}>
          <Button
            color='#D99860'
            title="New Trip"
            onPress={() => props.navigation.navigate('TripSuggestion')}
          />
          <Button
            title="Log Out"
            color="#89B3D9"
            onPress={() =>
              props.navigation.navigate('userLogin')
            }
          />
        </View>
      </View>
  );
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(HistoryNav);


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
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