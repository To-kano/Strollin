import React, { Component , useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

import {connect} from 'react-redux';




// apiKey AIzaSyDT8niDsJMDOvWCmxCh4n7BCKxpiZleQIg


function updatePosition(props, position) {

  if ( typeof updatePosition.one == 'undefined' ) {
    // It has not... perform the initialization
    updatePosition.one = 0;
  }

  //updatePosition.one += 0.01;

  let data = {
    latitude: position.coords.latitude + updatePosition.one,
    longitude: position.coords.longitude,
  }

  const action_position = {type: 'SET_POSITION', value : data};
  props.dispatch(action_position);
}

async function updateCoordinates(props) {
  if (props.position.permission == true) {
    Geolocation.getCurrentPosition(
      (position) => {
        //console.log(position);
        updatePosition(props, position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
};

function updateRegion(props) {

  //console.log("update region props ", props);
  console.log("update region region ", Map.region);

  const action_region = {type: 'SET_REGION', value : Map.region};
  props.dispatch(action_region);

}

async function requestGeolocalisationPermission(props) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Strollin ask geolocalisation Permission',
        message: '',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const action = {type: 'SET_PERMISSION', value : true};
      props.dispatch(action);
      console.log('You can use the geolocalisation');
    } else {
      const action = {type: 'SET_PERMISSION', value : false};
      props.dispatch(action);
      console.log('geolocalisation permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

//{
//  latitude: props.position.position.latitude,
//  longitude: props.position.position.longitude,
//  latitudeDelta: props.deltaView.latitudeDelta,
//  longitudeDelta: props.deltaView.longitudeDelta
//}

var wildRegion = {
        latitude: 48.815641,
        longitude: 2.363224,
        latitudeDelta: 0.1622,
        longitudeDelta: 0.1021
}

function Map(props) {

  let [localRegion, setLocalRegion] = useState({
      latitude: props.position.position.latitude,
      longitude: props.position.position.longitude,
      latitudeDelta: props.deltaView.latitudeDelta,
      longitudeDelta: props.deltaView.longitudeDelta
  })

  if ( typeof Map.region == 'undefined' ) {
    // It has not... perform the initialization
    Map.region = {
      latitude: props.position.position.latitude,
      longitude: props.position.position.longitude,
      latitudeDelta: props.deltaView.latitudeDelta,
      longitudeDelta: props.deltaView.longitudeDelta
  };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      //console.log('This will run every second!');

      updateRegion(props);
      updateCoordinates(props);
    }, 1000);  
    return () => clearInterval(interval);
  }, []);

  //console.log(props.position);

  if (props.position.asked == false) {
   requestGeolocalisationPermission(props);
  }

  if (props.position.permission == true && props.position.update == false) {
    updateCoordinates(props);
  }


  if (props.position.permission) {
    const origin = { latitude: props.position.position.latitude, longitude: props.position.position.longitude };
    const destination = props.waypoints[0];
    const GOOGLE_MAPS_APIKEY = 'AIzaSyB-xO-UPVjhXP85uteh1n5hIbUeXqqjWRI';

    return (
        <MapView style={{ height: props.height, width: props.width }}
              region={props.position.region}
              onRegionChange={(region)=> {Map.region = region}}
              >
              <MapViewDirections
                origin={origin}
                destination={destination}
                waypoints = {props.waypoints}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={7}
                strokeColor="#39A5D6"
              />
              <Marker
                coordinate={{ "latitude": props.position.position.latitude, "longitude": props.position.position.longitude }}
                title={"USER"}
                description={"User position"}
              />
              {props.waypoints.map(marker => (
                <Marker
                key={marker.id}
                  coordinate={{ "latitude": marker.latitude, "longitude": marker.longitude }}
                  title={marker.name}
                  description={"Destination"}
                />
              ))}
        </MapView>
    )
  } else {
    return (
      <View>
        <Text>No permision</Text>
      </View>
    )  
  }

}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Map);
