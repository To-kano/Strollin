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

const locales = RNLocalize.getLocales();
let language = "en"

let jsonDefault = {
    html_attributions: [],
    result: {
        formatted_address: "",
        /*geometry: {
            location: {
                lat: 48.81208969999999,
                lng: 2.362477
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
        },*/
        international_phone_number: "",
        name: "",
        opening_hours: {
            weekday_text: []
        },
        photos: [
            /*{
                height: 514,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/100968360572760858473\">Amor CHHIBI</a>"
                ],
                photo_reference: "ATtYBwLvzOL2TX4fr3mHjqxgqvF3IM97JwUj_ZQTV47Tmrw75CezEyc1Qop1ePMglkR5ALXg3NKG4eEP62AYqJ-tUDP8aR9GKBxhODQGpDW4LcGnhHruoCli-QlFF3CeYseaIefU_XZWni3iqStIM9k7NfJmxnA6Y0SdsJRPWOWNnRZsaiwT",
                width: 771
            },*/
        ],
        rating: 0,
        reviews: [],
        types: [],
        user_ratings_total: 0,
        website: ""
    },
    status: "OK"
}

const deltaView = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

function Notation(props) {

  const [value, onChangeValue] = React.useState(" ");
  const [jsonObject, onChangeJson] = useState(jsonDefault)
  const [isLoading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState(null);
  const [isPermision, setPermision] = useState(false)
  const [localRegion, setLocalRegion] = useState({
    latitudeDelta: deltaView.latitudeDelta,
    longitudeDelta: deltaView.longitudeDelta
  });

  useEffect(() => {
    setLocalRegion({
      ...localRegion,
      ...userPosition,
    });
  }, [userPosition]);

    if (Array.isArray(locales)) {
      language = locales[0].languageTag;
      console.log(language)
    }
    if (props.position.asked == false) {
      requestGeolocalisationPermission(props.dispatch);
    }
    if (props.position.permission == true && userPosition == null) {
      updateCoordinates(setUserPosition);
    }
    if (props.position.permission && userPosition && localRegion.latitude && localRegion.longitude) {
      setPermision(true)
    }

  function sendMessage(value) {
    const url = `https://${IP_SERVER}:${PORT_SERVER}/location/get_place`
    fetch(url, {
      headers : {
              place_name : value,
              locationlat: "48.8650988",
              locationlong: "2.1931007",
              language: language
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((answer) => {
        onChangeJson(answer.result)
      })
      .then(() => {
        //console.log("doneF")
      })
      .catch((error) => {
        console.error('error :', error);
      })
      .finally(() => setLoading(false));
      //console.log("done")

  }
  /*var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
  var now = new Date();

  var day = now.getDayName();
  console.log("______________________________________________" + day)*/

  return (
    <View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{I18n.t('Notation.information')}</Text>
          <TextInput
            autoCapitalize={'none'}
            onChangeText={(text) => onChangeValue(text)}
            value={value}
            style={{ borderWidth: 1 }}
          />
          <Button
            onPress={() => {
              sendMessage(value);
            }}
            title={I18n.t('Notation.send')}
            color="#841584"
          />
        </View>
        {isLoading ? <View/> : (
        <View>
          <Text> {"\n"} {jsonObject.result.name} {"\n"}</Text>
          <FlatList
            data={jsonObject.result.opening_hours.weekday_text}
            renderItem={({ item }) => <Text> {item} </Text>}
            keyExtractor={(item) => item.id}
          />
          <Text> {"\n"} </Text>
          <FlatList
            data={jsonObject.result.types}
            renderItem={({ item }) => <Text> {item} </Text>}
            keyExtractor={(item) => item.id}
          />
          <Text> {"\n"} {jsonObject.result.formatted_address} {"\n"} </Text>
          <Text> {jsonObject.result.website} {"\n"}</Text>
          {/*<FlatList
            data={jsonObject.result.photos}
            renderItem={({ item }) =>
            <Image
              source={{
                uri: item.html_attributions[0],
              }}
            />}
            keyExtractor={(item) => item.id}
          />*/}
        </View>
      )}
    </View>
  );
}

//const mapStateToProps = (state) => state;

export default Notation;
