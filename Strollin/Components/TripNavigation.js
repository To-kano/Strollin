import React, { Component , useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';

import {connect} from 'react-redux';

import Map from './map';

function TripNavigation(props) {

  const waypoints = props.map.waypoints;

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 0.3, marginTop: 40}}>
        <Text style={{fontSize: 30, fontFamily:"lobster", color:"#EEB015"}}>Strollin</Text>
      </View>
      <View style={{flex: 3}}>
        <Map height={"100%"} width={380} deltaView={deltaView} waypoints={waypoints} />
      </View>
      <View style={{flex: 1, position: 'absolute', bottom: 0, left: 0, marginTop: 10}}>
        <Button
          title="End Navigation"
          onPress={() => props.navigation.navigate('Home')}
        />
      </View>
    </View>
  );

}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(TripNavigation);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
});