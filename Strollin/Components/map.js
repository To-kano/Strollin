import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

import { connect } from 'react-redux';

import { addUserHistoric } from '../apiServer/user';

import Tts from 'react-native-tts';
import I18n from '../Translation/configureTrans';

// apiKey AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE

// AIzaSyB2twbHyNnN0rJWw4731l9rOjEgANYLrQU

export async function updateCoordinates(setUserPosition) {
  Geolocation.getCurrentPosition(
    (position) => {
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      // //console.log(position);
      setUserPosition(data);
    },
    (error) => {
      //console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}
//
export async function requestGeolocalisationPermission(dispatch) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: I18n.t('Map.geoPermission'),
        message: '',
        buttonNeutral: I18n.t('Map.askLater'),
        buttonNegative: I18n.t('Map.cancel'),
        buttonPositive: I18n.t('Map.ok'),
      },
    );
    if (PermissionsAndroid.RESULTS && granted === PermissionsAndroid.RESULTS.GRANTED) {
      const action = { type: 'SET_PERMISSION', value: true };
      dispatch(action);
      // //console.log('You can use the geolocalisation');
    } else {
      const action = { type: 'SET_PERMISSION', value: false };
      dispatch(action);
      // //console.log('geolocalisation permission denied');
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

function Map({position, height, width, deltaView, locations, profil, map, dispatch, navigation}) {
  const [userPosition, setUserPosition] = useState(null);
  const allTime = []

  //console.log("map\n");
  //console.log("position", deltaView, waypoints);
  useEffect(() => {
    setLocalRegion({
      ...localRegion,
      ...userPosition,
    });
  }, [userPosition]);

  const [localRegion, setLocalRegion] = useState({
    latitudeDelta: deltaView.latitudeDelta,
    longitudeDelta: deltaView.longitudeDelta
  });

  const [destinations, setDestinations] = useState(locations ? locations : map.locations);//props.course);


  //console.log("destination\n", destinations);
  //console.log("final\n", destinations[destinations.length - 1]);
  //console.log("parcoure\n", destinations.slice(0, destinations.length - 1));


  /*useEffect(() => {
    console.log("i'm here")
    console.log(ts)
  }, [])*/

  useEffect(() => {
    if (profil.sound) {
      if (destinations.length == []) {
        Tts.setDefaultLanguage('en-US');
        Tts.speak('You have done your navigation');
        addUserHistoric(profil.access_token, map.course._id);
        setDestinations()
        const action = { type: 'ADD_HISTORIC', locations: map.locations, course: map.locations };
        dispatch(action);
        //sleep(2000);
        navigation.navigate('CourseEvaluation');
      } else {
        Tts.setDefaultLanguage('en-US');
        Tts.speak(`Heading to ${destinations[0].name}`);
      }
    }
  }, [destinations]);

  const [magic, setMagic] = useState(1);

  const BlackMagic = () => {
    setMagic(0);
  };

  //const [refMapView, setRefMapView] = useState(React.createRef());

  async function setTimedestinations() {
    let tmp = await Date.now()
    console.log("________________________")
    console.log(tmp)

    const action = { type: 'SET_TIME', value: tmp };
    props.dispatch(action);
  }

  const onUserPositionChange = (data) => {
    const position = {
      latitude: data.coordinate.latitude,
      longitude: data.coordinate.longitude,
    };
    if (destinations.length != 0 && isNear(position, destinations[0])) {
      setDestinations(destinations.slice(1, destinations.length));
      setTimedestinations()
    }
    // if (props.background) {
    // refMapView.current.animateToRegion(localRegion, 500);
    // }
    setUserPosition(position);
  };

  if (position.asked == false) {
    requestGeolocalisationPermission(dispatch);
  }
//
  if (position.permission == true && userPosition == null) {
      updateCoordinates(setUserPosition);
    }
//
  if (position.permission && userPosition && localRegion.latitude && localRegion.longitude) {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE';
//
    return (
      <MapView
        style={{ height: height, width: width + magic }} // showsMyLocationButton do not show if width is not change
        //ref={refMapView}
        initialRegion={localRegion}
        showsUserLocation
        showsCompass
        onMapReady={BlackMagic}
        userLocationPriority="balanced"
        onUserLocationChange={(data) => {
          onUserPositionChange(data.nativeEvent);
        }}
        //onRegionChange={(region) => {}}
        >

          <MapViewDirections
            origin={userPosition}
            destination={destinations[destinations.length - 1]}
            //destination={getLocation()}
            waypoints={destinations.slice(0, destinations.length - 1)}
            //waypoints={destinations.slice(0, destinations.length - 1)}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            timePrecision="now"
            resetOnChange={false}
            strokeColor="#39A5D6"
            mode="WALKING"
            //onReady={({
            //  distance, duration, coordinates, fare, destinationsOrder
            //}) => {
            //  //console.log('distance ', distance, ' duration ', duration);
            //}}
          />

            {destinations.map((marker) => (
              <Marker
                key={marker._id}
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
      <Text>{I18n.t('Map.noPermission')}</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return (
    {
      position: state.position,
      profil: state.profil,
      map: state.map
    }
  )
};

//const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Map);

//export default Map;
