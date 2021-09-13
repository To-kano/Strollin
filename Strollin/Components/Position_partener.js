import React, { Component } from 'react';
import {
  ActivityIndicator, Image, View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput
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
import { DrawerActions } from '@react-navigation/native';
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
  const [showLoader, setLoader] = useState(<View/>);
  const [isLoading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState(null);
  const [isPermision, setPermision] = useState(false)
  const allTime = []
  let language = "en"
  ////console.log(props.navigate);
  useEffect(() => {
  //console.log("i'm here")
    if (Array.isArray(locales)) {
      language = locales[0].languageTag;
    //console.log(language)
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
         //console.log(error.code, error.message);
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
      //console.log(answer)
        setAdress(answer.result.formatted_address)
        regionTmp.latitude = answer.result.geometry.location.lat
        regionTmp.longitude = answer.result.geometry.location.lng
        setRegion(regionTmp)
      })
      .then(() => {
      //console.log("doneF")
      })
      .catch((error) => {
        console.error('error ici :', error);
      })
      .finally(() => setLoading(false));
    //console.log("doneFF")
  }

  const [adress, setAdress] = useState("")
  const [region, setRegion] = useState({
      latitude: 48.8650988,
      longitude: 2.1931007,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    });

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.partnerPosition')}
          {'   '}
        </Text>
      </View>
      <Text style={styles.text_info}>Adresse de votre commerce :</Text>
      <View style={styles.view_search}>
        <TextInput
          onChangeText={(text) => onChangeValue(text)}
          value={value}
          style={styles.textInput_search}
        />
        <TouchableOpacity onPress={() => { sendMessage(value); setLoading(true); setLoader(<ActivityIndicator style={{marginTop: '75%'}} size="large" color="#0092A7"/>)}}>
          <Image style={styles.img_search} source={require('../images/icons/black/search.png')} />
        </TouchableOpacity>

      </View>
      <View style={styles.view_list}>
        {isLoading ? showLoader  : (
            <View>
              <View style={styles.view_information}>
                <Image style={styles.img_location} source={require('../images/logo/marker_small.png')}/>
                <Text numberOfLines={1} style={styles.text_location}>{adress}</Text>
              </View>
              <MapView
              style={{ height: '92.7%', width: '106.5%', marginLeft: '-3.25%'}}
              showsCompass
              userLocationPriority="balanced"
              region={region}
              >
              <Marker
                image={require('../images/logo/marker_small.png')}
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
              />
              </MapView>
          </View>
        )}
      </View>
    </View>
    // <View>
    //     <View>
    //       <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{I18n.t('Position.information')}</Text>
    //       <TextInput
    //         onChangeText={(text) => onChangeValue(text)}
    //         value={value}
    //         style={{ borderWidth: 1 }}
    //       />
    //       <Button
    //         onPress={() => {
    //           sendMessage(value);
    //         }}
    //         title={I18n.t('Position.send')}
    //         color="#841584"
    //       />
    //     </View>
    //     {isLoading ? <View/> : (
    //       <View>
    //         <Text>{adress}</Text>
    //         <MapView
    //         style={{ height: 500, width: 400  }}
    //         showsCompass
    //         userLocationPriority="balanced"
    //         region={region}
    //         >
    //         <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
    //         </MapView>
    //       </View>
    // )}
    // </View>
  );
}

const styles = StyleSheet.create({
  view_back: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '3.3%',
    paddingRight: '3.3%',
    paddingBottom: '0%',
  },
  view_header: {
    flex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput_header: {
    height: 40,
    width: '85%',
    borderRadius: 21,
    marginRight: 12.5,
    paddingLeft: 12.5,
    backgroundColor: '#FFFFFF',
  },
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
  text_header: {
    width: '87.6%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  view_list: {
    flex: 757,
    width: '100%',
    alignContent: 'flex-start',
  },
  view_search: {
    flex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text_info: {
    width: '96%',
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput_search: {
    flex: 100,
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingHorizontal: 15,
    marginRight: 15,
  },
  img_search: {
    flex: 34,
    width: 34,
    resizeMode: 'contain',
  },
  view_information: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img_location: {
    width: 25,
    resizeMode: 'contain',
    height: 25,
    marginRight: 10,
  },
  text_location: {
    width: '90%',
    fontSize: 16,
    color: '#000',
  },
});

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
