import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput
} from 'react-native';
import { useState, useEffect } from 'react';
import I18n from '../Translation/configureTrans';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import { connect } from 'react-redux';
import { requestGeolocalisationPermission, updateCoordinates } from './map'
import * as RNLocalize from 'react-native-localize';
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Store from '../Store/configureStore';
import {getCustomCourse} from '../apiServer/course';
import Geolocation from 'react-native-geolocation-service';
const store = Store.getState();


const locales = RNLocalize.getLocales();
let language = "en"

let jsonDefault = {
    html_attributions: [],
    result: {
        formatted_address: "",
        geometry: {
            location: {
                lat: 48.8650988,
                lng: 2.1931007
            },
            viewport: {
                northeast: {
                    lat: 48.81343868029148,
                    lng: 2.363825980291502
                },
                southwest: {
                    lat: 48.81074071970848,
                    lng: 2.361128019708498
                }
            }
        },
    },
    status: "OK"
}

function Position_partener(props) {

  const [value, onChangeValue] = React.useState(" ");
  const [jsonObject, onChangeJson] = useState(jsonDefault)
  const [isLoading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState(null);
  const [isPermision, setPermision] = useState(false)
  const allTime = []
  let language = "en"
  ////console.log(props.navigate);
  useEffect(() => {
    console.log("i'm here")
    if (Array.isArray(locales)) {
      language = locales[0].languageTag;
      console.log(language)
    }
    if (region.longitude === 2.1931007) {
      Geolocation.getCurrentPosition(
        (position) => {
          /*const data = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };*/
          let regionTmp = region
          regionTmp.longitude = position.coords.longitude
          regionTmp.latitude = position.coords.latitude
          setRegion(regionTmp)
        },
        (error) => {
           console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [])

  if (props.asked == false) {
    requestGeolocalisationPermission(Store.dispatch);
  }
  if (props.permission == true && userPosition == null) {
    updateCoordinates(setUserPosition);
  }
  if (props.permission && userPosition) {
    setPermision(true)
    let regionTmp = region
    regionTmp.longitude = userPosition.longitude
    regionTmp.latitude = userPosition.latitude
    setRegion(regionTmp)
  }

  const GOOGLE_MAPS_APIKEY = 'AIzaSyDGvC3HkeGolvgvOevKuaE_6LmS9MPjlvE';

  let regionTmp = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  }

  function sendMessage(value) {
    const url = `http://${IP_SERVER}:${PORT_SERVER}/location/get_location_position`
    fetch(url, {
      headers : {
        place_name: value,
        language: language
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((answer) => {
        console.log(answer)
        setAdress(answer.result.formatted_address)
        regionTmp.latitude = answer.result.geometry.location.lat
        regionTmp.longitude = answer.result.geometry.location.lng
        setRegion(regionTmp)
      })
      .then(() => {
        console.log("doneF")
      })
      .catch((error) => {
        console.error('error ici :', error);
      })
      .finally(() => setLoading(false));
      console.log("doneFF")
  }

  const [adress, setAdress] = useState("")
  const [region, setRegion] = useState({
      latitude: 48.8650988,
      longitude: 2.1931007,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    });

  return (
    <View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{I18n.t('Position.information')}</Text>
          <TextInput
            onChangeText={(text) => onChangeValue(text)}
            value={value}
            style={{ borderWidth: 1 }}
          />
          <Button
            onPress={() => {
              sendMessage(value);
            }}
            title={I18n.t('Position.send')}
            color="#841584"
          />
        </View>
        {isLoading ? <View/> : (
          <View>
            <Text>{adress}</Text>
            <MapView
            style={{ height: 500, width: 400  }}
            showsCompass
            userLocationPriority="balanced"
            region={region}
            >
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>
          </View>
    )}
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

export default (Position_partener);
