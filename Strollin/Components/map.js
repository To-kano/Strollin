import React, { Component , useState, useEffect} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

import {connect} from 'react-redux';




// apiKey AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE


//AIzaSyB2twbHyNnN0rJWw4731l9rOjEgANYLrQU

function updatePosition(props, position) {

  //if ( typeof updatePosition.one == 'undefined' ) {
  //  // It has not... perform the initialization
  //  updatePosition.one = 0;
  //}

  //updatePosition.one += 0.01;

  let data = {
    latitude: position.coords.latitude, //+ updatePosition.one,
    longitude: position.coords.longitude,
  }

  const action_position = {type: 'SET_POSITION', value : data};
  props.dispatch(action_position);
}

async function updateCoordinates(setUserPosition) {
  //if (props.position.permission == true) {
    Geolocation.getCurrentPosition(
      (position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        //console.log(position);
        setUserPosition(data);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  //}
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

function onUserPositionChange(data) {
  console.log("data = ", data);
}

function Map(props) {

  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    setLocalRegion({
      ...localRegion,
      ...userPosition,
    });
  }, [userPosition])

  const [localRegion, setLocalRegion] = useState({
    latitudeDelta: props.deltaView.latitudeDelta,
    longitudeDelta: props.deltaView.longitudeDelta
  });

  useEffect(() => {
    const interval = setInterval(() => {
      //console.log('This will run every second!');

      //updateRegion(props);
      //updateCoordinates(props);
    }, 1000);  
    return () => clearInterval(interval);
  }, []);

  //console.log(props.position);

  if (props.position.asked == false) {
   requestGeolocalisationPermission(props);
  }

  if (props.position.permission == true && userPosition == null) {
    updateCoordinates(setUserPosition);
  }


  if (props.position.permission && userPosition && localRegion.latitude && localRegion.longitude) {
    const origin = { latitude: props.position.position.latitude, longitude: props.position.position.longitude };
    const destination = props.waypoints[0];
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE';

    return (
        <MapView style={{ height: props.height, width: props.width }}
              region={{
                latitude: props.position.position.latitude,
                longitude: props.position.position.longitude,
                latitudeDelta: props.deltaView.latitudeDelta,
                longitudeDelta: props.deltaView.longitudeDelta
            }}
            showsUserLocation={true}
            onUserLocationChange={(data) => {
              //console.log("data = ", data.nativeEvent);
            }}
              onRegionChange={(region)=> {}}
              >
              <MapViewDirections
                origin={userPosition}
                destination={destination}
                waypoints = {props.waypoints}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={7}
                strokeColor="#39A5D6"
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

//<Marker
//coordinate={{ "latitude": props.position.position.latitude, "longitude": props.position.position.longitude }}
//title={"USER"}
//description={"User position"}
///>


const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Map);
