import React, { Component ,useState, useEffect} from 'react';
import { Text, View, TouchableHighlight, FlatList, Button, ImageBackground, StyleSheet, Dimensions } from 'react-native';
//import stylesHomepage from '../../styles/homepage'
//import stylesGeneric from '../../styles/genericStyle'
//import { RondFormeText } from "../../features/geoForme/rondForm"

import Map from './map';

function ElementHistoryNav(props) {

  const [showMap, setShowMap] = useState(false);

  const waypoints = props.data;

  const deltaView = {
    latitudeDelta: 0.1622,
    longitudeDelta: 0.1021,
  }

  console.log("element ", props.data);

  if (showMap == false) {
    return (
      <View style={{ margin: 20, flex: 1, alignItems: "center", justifyContent: "space-evenly" }}>
        <TouchableHighlight onPress={() => setShowMap(!showMap)}>
          <FlatList
              data={waypoints}
              renderItem={({ item }) => (
                <View style={{ margin: 10}}>
                  <Text>Step: {item.id} </Text>
                  <Text>Name: {item.name} </Text>
                  <Text>Adress {item.address} </Text>
                </View>
              )}
          />
        </TouchableHighlight>
      </View>
    );
  } else {
    return (
      <View style={{ paddingTop: 10}}>
        <TouchableHighlight onPress={() => setShowMap(!showMap)}>
        <View>
          <Map height={300} width={250} deltaView={deltaView} waypoints={waypoints} />
        </View>
        </TouchableHighlight>
        
      </View>
    );
  }
}

export default ElementHistoryNav;


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