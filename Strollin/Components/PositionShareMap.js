import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View, Text, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Store from '../Store/configureStore';
import { connect } from 'react-redux';

import Tts from 'react-native-tts';
import { addUserHistoric } from '../apiServer/user';

import I18n from '../Translation/configureTrans';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export async function updateCoordinates(setUserPosition) {
  Geolocation.getCurrentPosition(
    (position) => {
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setUserPosition(data);
      return
    },
    (error) => {
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
    } else {
      const action = { type: 'SET_PERMISSION', value: false };
      dispatch(action);
    }
  } catch (err) {
    console.warn(err);
  }
}

function PositionShareMap({
  route, position, dispatch
}) {

  const deltaView = {
    latitudeDelta: 0.1622,
    longitudeDelta: 0.1021,
  };
  const { latitude, longitude, name } = route.params;


  const sharedPosition = { latitude: Number(latitude), longitude: Number(longitude), latitudeDelta: deltaView.latitudeDelta, longitudeDelta: deltaView.longitudeDelta }
  const store = Store.getState();
  const [userPosition, setUserPosition] = useState(store.CourseSettings.pos);


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

  const [magic, setMagic] = useState(1);

  const BlackMagic = () => {
    setMagic(1);
  };

  const onUserPositionChange = (data) => {
    const position = {
      latitude: data.coordinate.latitude,
      longitude: data.coordinate.longitude,
    };
    setUserPosition(position);
  };

  const mapStyle = [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]


  if (position.asked == false) {
    requestGeolocalisationPermission(dispatch);
  }
  //
  if (position.permission == true && !userPosition) {
    updateCoordinates(setUserPosition);
  }
  //
  if (localRegion.latitude && localRegion.longitude) {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE';
    //
    return (
      <MapView
        customMapStyle={mapStyle}
        style={{ height: windowHeight, width: windowWidth }} // showsMyLocationButton dont show if width is not change
        initialRegion={ localRegion }
        showsUserLocation={true}
        showsCompass={false}
        mapType="standard"
        followUserLocation={false}
        onMapReady={BlackMagic}
        userLocationPriority="balanced"
        onUserLocationChange={(data) => {
          onUserPositionChange(data.nativeEvent);
        }}
      >
        <Marker
          coordinate={ sharedPosition }
          title={name}
          description={""}
          image={require('../images/logo/marker_small.png')}
          width={44}
          height={64}
        />
      </MapView>
    );
  }
  return (
    <View>
      <Text>{I18n.t('Map.noPermission')}</Text>
    </View>
  );
}

const mapStateToProps = (state) => (
  {
    position: state.position,
    profil: state.profil,
    map: state.map
  }
);

// const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(PositionShareMap);

// export default Map;
