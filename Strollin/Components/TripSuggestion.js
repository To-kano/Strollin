import React,  { Component , useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native';
import Map from './map'
//import { getGoogleApiSearch } from '../api/google-api/google-api';
////import { getTags } from '../../dataBase/actions'
//import Geolocation from '@react-native-community/geolocation';
//import Geolocation from 'react-native-geolocation-service';

import {connect} from 'react-redux';

function getNavigation() {
  const destination1 = [
    {
      id: '1',
      latitude: 48.815641,
      longitude: 2.363224,
      name: 'nowhere',
    },
    {
      id: '2',
      latitude: 47.815641,
      longitude: 2.363224,
      name: '1',
    },{
      id: '3',
      latitude: 46.815641,
      longitude: 2.363224,
      name: '2',
    }
  ]

  const destination2 = [
    {
      id: '1',
      latitude: 48.815641,
      longitude: 2.363224,
      name: 'somewhere',
    },
    {
      id: '2',
      latitude: 47.815641,
      longitude: 2.363224,
      name: '1',
    },{
      id: '3',
      latitude: 46.815641,
      longitude: 2.363224,
      name: '2',
    }
  ]

  const destination3 = [
    {
      id: '1',
      latitude: 48.815641,
      longitude: 2.363224,
      name: 'where ?',
    },
    {
      id: '2',
      latitude: 47.815641,
      longitude: 2.363224,
      name: '1',
    },{
      id: '3',
      latitude: 46.815641,
      longitude: 2.363224,
      name: '2',
    }
  ]

  const allDestination = [
    destination1,
    destination2,
    destination3
  ]

  const rand = Math.floor(Math.random() * Math.floor(3));

  return allDestination[rand];
}

function TripSuggestion(props) {

  const [waypoints, setWaypoints] = useState(getNavigation());

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5}}>
        <Text style={{ textAlign: "center", fontSize: 30, fontFamily: "lobster", color: "#EEB015", marginTop: 10 }}>Strollin</Text>
        <Text style={[{ textAlign: "center", fontSize: 20, margin: 10 }]}>Trip Suggestion</Text>
      </View>
      <View style={{ flex: 1, marginTop: 50, backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 0 }}>
        <Text style={[{ textAlign: "center", fontSize: 30, color: "#39A5D6", margin: 5 }]}>Heading to:</Text>
        <Text style={[{ textAlign: "center", fontSize: 40 }]}>{waypoints[0].name}</Text>
      </View>
      <View style={{ flex: 3.5, marginTop: 50 }}>
        <Map height={'100%'} width={360} deltaView={deltaView} waypoints={waypoints} />
      </View>
      <View style={{ flex: 0.4, flexDirection: "row", justifyContent: "space-around", paddingTop: 10, marginBottom: 10 }}>
      <Button
          title="Another One!"
          color="#EEB015"
          onPress={() =>
            setWaypoints(getNavigation())
          }
      />
      <Button
        title="Let's go!"
        color="#89B3D9"
        onPress={() => {
          const action = {type: 'SET_WAYPOINTS', value : waypoints};
          props.dispatch(action);
          props.navigation.navigate('TripNavigation')
        }}
      />
      </View>
    </View>
  );

}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(TripSuggestion);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
