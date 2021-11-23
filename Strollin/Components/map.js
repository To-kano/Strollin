import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View, Text, Dimensions, Modal, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Store from '../Store/configureStore';
import { connect } from 'react-redux';
import {createNewCourse} from '../apiServer/course';

import Tts from 'react-native-tts';
import { addUserHistoric } from '../apiServer/user';

import I18n from '../Translation/configureTrans';
import { uses24HourClock } from 'react-native-localize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// apiKey AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE

// AIzaSyB2twbHyNnN0rJWw4731l9rOjEgANYLrQU

export async function updateCoordinates(setUserPosition) {
  Geolocation.getCurrentPosition(
    (position) => {
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    //console.log("pritn de pierre: ", position);
      setUserPosition(data);
      return
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

function Map({
  position, height, width, deltaView, locations, profil, map, dispatch, navigation, isMoving
}) {
  const allTime = [];
  const store = Store.getState();
  const [userPosition, setUserPosition] = useState(store.CourseSettings.pos);
  const [locationToDelete, setLocationToDelete] = useState(null);

  /// /console.log(props.navigate);
  // console.log("map\n");
  // console.log("position", deltaView, waypoints);
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

  const deleteOneLocation = (id) => {
    const result = destinations.filter((lieux) => {
      return lieux.id != id
    })

    setDestinations(result);
  }

  //const [waypoint, setWaypoint] = useState(props.waypoints);
  const [destinations, setDestinations] = useState(locations || map.locations);// props.course);
  console.log("destination ", destinations);
  const [delToken, setDelToken] = useState("Bonchour");
  //console.log(waypoint);
  /* useEffect(() => {

  // console.log("destination\n", destinations);
  //console.log("final\n", destinations[destinations.length - 1]);
  //console.log("parcoure\n", destinations.slice(0, destinations.length - 1));

  /*useEffect(() => {
  //console.log("i'm here")
  //console.log(ts)
  }, []) */

  useEffect(() => {

    if (destinations.length <= 0 || destinations == []) {

      const store = Store.getState();
      createNewCourse(store.profil.access_token, store.course.currentCourse)
      .then((result) => {
        addUserHistoric(store.profil.access_token, result.id);
        var action = { type: 'ADD_HISTORY', courseID: result.id };
        dispatch(action);
        const action2 = { type: 'ADD_COURSE_OBJECT_HISTORIC', value: result };
        dispatch(action2);
        action = {
          type: 'ADD_IS_MOVING',
          value: true
        };
        Store.dispatch(action);
        navigation.navigate('CourseEvaluation');
      })
    }
    

    if (profil.sound) {
      if (destinations.length <= 0 || destinations == []) {
        Tts.setDefaultLanguage('en-US');
        Tts.speak('You have done your navigation');
        //addUserHistoric(profil.access_token, map.course._id);
        ////setDestinations();
        //const action = { type: 'ADD_HISTORY', courseID: map.course.id };
        //dispatch(action);
        //// sleep(2000);
        //navigation.navigate('CourseEvaluation');
      } else {
        Tts.setDefaultLanguage('en-US');
        Tts.speak(`Heading to ${destinations[0].name}`);
      }
    }
  }, [destinations]);

  const [magic, setMagic] = useState(1);

  const BlackMagic = () => {
    setMagic(1);
  };

  // const [refMapView, setRefMapView] = useState(React.createRef());

  async function setTimedestinations() {
    const tmp = await Date.now();
  //console.log('________________________');
  //console.log(tmp);

    const action = { type: 'SET_TIME', value: tmp };
    dispatch(action);
  }

  const onUserPositionChange = (data) => {
    if (isMoving == false)
      return;
    const position = {
      latitude: data.coordinate.latitude,
      longitude: data.coordinate.longitude,
    };
    if (destinations.length > 0 && isNear(position, destinations[0])) {
      setDestinations(destinations.slice(1, destinations.length));
      setTimedestinations();
    }
    // if (props.background) {
    // refMapView.current.animateToRegion(localRegion, 500);
    // }
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
  if (position.permission == true && userPosition == null) {
    updateCoordinates(setUserPosition);
  }
  //
  if (!destinations || destinations.length <= 0) {
    return null;
  }
  if (position.permission && userPosition && localRegion.latitude && localRegion.longitude) {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE';
    //
    return (
      <>
        <MapView
          customMapStyle={mapStyle}
          style={{ height: windowHeight, width: windowWidth }} // showsMyLocationButton dont show if width is not change
          initialRegion={localRegion}
          showsUserLocation={true}
          showsCompass={false}
          mapType="standard"
          followUserLocation={true}
          onMapReady={BlackMagic}
          userLocationPriority="balanced"
          onUserLocationChange={(data) => {
            onUserPositionChange(data.nativeEvent);
          }}
        >

          <MapViewDirections
            origin={userPosition}
            destination={destinations[destinations.length - 1]}
              // destination={getLocation()}
            waypoints={destinations.slice(0, destinations.length - 1)}
              // waypoints={destinations.slice(0, destinations.length - 1)}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            language='fr'
            timePrecision="now"
            resetOnChange={false}
            strokeColor="#0989FF"
            mode="WALKING"
          />

          {destinations.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.name}
              description={marker.address}
              image={require('../images/logo/marker_small.png')}
              width={44}
              height={64}
              onCalloutPress={() => {
                setLocationToDelete(marker)
              }}
            />
          ))}
        </MapView>
        {locationToDelete != null &&
          <Modal animationType="slide">
            <Text style={{textAlign: 'center'}}>Do you want to remove {locationToDelete.name} from the course ?</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                title="Yes"
                onPress={() => {
                  deleteOneLocation(locationToDelete.id);
                  setLocationToDelete(null);
                }}
              />
              <Button
                title="No"
                onPress={() => {setLocationToDelete(null)}}
              />
            </View>
          </Modal>
        }
      </>
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
export default connect(mapStateToProps)(Map);

// export default Map;
