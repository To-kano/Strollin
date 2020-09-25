import React, { Component, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

import { connect } from 'react-redux';

import Tts from 'react-native-tts';

// apiKey AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE

// AIzaSyB2twbHyNnN0rJWw4731l9rOjEgANYLrQU

async function updateCoordinates(setUserPosition) {
  // if (props.position.permission == true) {
  Geolocation.getCurrentPosition(
    (position) => {
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      console.log(position);
      setUserPosition(data);
    },
    (error) => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  // }
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
      const action = { type: 'SET_PERMISSION', value: true };
      props.dispatch(action);
      console.log('You can use the geolocalisation');
    } else {
      const action = { type: 'SET_PERMISSION', value: false };
      props.dispatch(action);
      console.log('geolocalisation permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

function isNear(userPosition, elementPosition) {
  const margin = 0.0022;

  if (userPosition.latitude <= elementPosition.latitude + margin && userPosition.latitude >= elementPosition.latitude - margin) {
    if (userPosition.longitude <= elementPosition.longitude + margin && userPosition.longitude >= elementPosition.longitude - margin) {
      return true;
    }
  }
  return false;
}

function Map(props) {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    setLocalRegion({
      ...localRegion,
      ...userPosition,
    });
  }, [userPosition]);

  const [localRegion, setLocalRegion] = useState({
    latitudeDelta: props.deltaView.latitudeDelta,
    longitudeDelta: props.deltaView.longitudeDelta
  });

  // useEffect(() => {
  //  const interval = setInterval(() => {
  //    //console.log('This will run every second!');
  //
  //    //updateRegion(props);
  //    //updateCoordinates(props);
  //  }, 1000);
  //  return () => clearInterval(interval);
  // }, []);

  const [waypoint, setWaypoint] = useState(props.waypoints);

  useEffect(() => {
    // console.log("waypoint ", waypoint);

    if (waypoint.length == []) {
      Tts.setDefaultLanguage('en-US');
      Tts.speak('You have done your navigation');
      const action = { type: 'ADD_HISTORIC', value: props.waypoints };
      props.dispatch(action);
      props.navigation.navigate('HomePage');
    } else {
      Tts.setDefaultLanguage('en-US');
      Tts.speak(`Heading to ${waypoint[0].name}`);
    }
  }, [waypoint]);

  // console.log(waypoint);

  const [magic, setMagic] = useState(1);

  const BlackMagic = () => {
    setMagic(0);
  };

  const [refMapView, setRefMapView] = useState(React.createRef());

  const onUserPositionChange = (data) => {
    // console.log("data = ", data);
    const position = {
      latitude: data.coordinate.latitude,
      longitude: data.coordinate.longitude,
    };
    if (waypoint.length != 0 && isNear(position, waypoint[0])) {
      setWaypoint(waypoint.slice(1, waypoint.length));
    }
    // if (props.background) {
    // refMapView.current.animateToRegion(localRegion, 500);
    // }
    setUserPosition(position);
  };

  // console.log(props.position);

  if (props.position.asked == false) {
    requestGeolocalisationPermission(props);
  }

  if (props.position.permission == true && userPosition == null) {
    updateCoordinates(setUserPosition);
  }

  if (props.position.permission && userPosition && localRegion.latitude && localRegion.longitude) {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE';

    return (
      <MapView
        style={{ height: props.height, width: props.width + magic }} // showsMyLocationButton do not show if width is not change
        ref={refMapView}
        initialRegion={localRegion}
        showsUserLocation
        showsCompass
        onMapReady={BlackMagic}
        userLocationPriority="balanced"
        onUserLocationChange={(data) => {
          onUserPositionChange(data.nativeEvent);
        }}
        onRegionChange={(region) => {}}
      >
        <MapViewDirections
          origin={userPosition}
          destination={waypoint[waypoint.length - 1]}
          waypoints={waypoint.slice(0, waypoint.length - 1)}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          timePrecision="now"
          resetOnChange={false}
          strokeColor="#39A5D6"
          mode="WALKING"
          onReady={({
            distance, duration, coordinates, fare, waypointOrder
          }) => {
            console.log('distance ', distance, ' duration ', duration);
          }}
        />
        {waypoint.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.name}
            description="Destination"
          />
        ))}
      </MapView>
    );
  }
  return (
    <View>
      <Text>No permision</Text>
    </View>
  );
}

// {
//  latitude: props.position.position.latitude,
//  longitude: props.position.position.longitude,
//  latitudeDelta: props.deltaView.latitudeDelta,
//  longitudeDelta: props.deltaView.longitudeDelta
// }

// <Marker
// coordinate={{ "latitude": props.position.position.latitude, "longitude": props.position.position.longitude }}
// title={"USER"}
// description={"User position"}
/// >

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Map);
