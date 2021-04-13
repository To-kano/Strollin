import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput, TouchableOpacity
} from 'react-native';
import { useState, useEffect } from 'react';
import I18n from '../Translation/configureTrans';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import { connect } from 'react-redux';
import { requestGeolocalisationPermission, updateCoordinates } from './map'
import * as RNLocalize from 'react-native-localize';

const locales = RNLocalize.getLocales();
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { Popup, Toast, Root } from 'popup-ui'

let language = "en"
let finalJson = []
var myLoop = []
let jsonDefault = {}

let jsonTest = []

const deltaView = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

function Personal_trip(props) {
  const [region, setRegion] = useState({
      latitude: 48.8650988,
      longitude: 2.1931007,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
  });
  const [value, onChangeValue] = React.useState(" ");
  const [jsonObject, onChangeJson] = useState(jsonDefault)
  const [isLoading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState(null);
  const [isPermision, setPermision] = useState(false)
  const [localRegion, setLocalRegion] = useState({
    latitudeDelta: deltaView.latitudeDelta,
    longitudeDelta: deltaView.longitudeDelta
  });
  const [maps, setMaps] = useState(false)
  const [final, setFinal] = useState(false)

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
    if (props.asked == false) {
      requestGeolocalisationPermission(props.dispatch);
    }
    if (props.permission == true && userPosition == null) {
      updateCoordinates(setUserPosition);
    }
    if (props.permission && userPosition && localRegion.latitude && localRegion.longitude) {
      setPermision(true)
    }

  function setLocationMaps() {
    let jsonTmp = {
      latitude: 0,
      longitude: 0
    }

    jsonTmp.latitude = jsonObject.result.geometry.location.lat
    jsonTmp.longitude = jsonObject.result.geometry.location.lng
    jsonTest.push(jsonTmp)
  }

  function sendMessage(value) {
    const url = `http://${IP_SERVER}:${PORT_SERVER}/location/get_place`
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
    <Root>
    <View>
    {maps || final ? <View/> : (
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{"Personal trip"}</Text>
          <TextInput
            onChangeText={(text) => onChangeValue(text)}
            value={value}
            style={{ borderWidth: 1 }}
          />
          <Button
            onPress={() => {
              sendMessage(value);
            }}
            title={"search"}
            color="#841584"
          />
        </View>
      )}
        {isLoading ? <View/> : maps ?
        <View>
        <Button
          onPress={() => {
            console.log("back")
            setMaps(false)
          }}
          title={"back"}
        />
        <MapView
        style={{ height: 600, width: 400, marginTop: 5 }}
        showsCompass
        userLocationPriority="balanced"
        region={region}
        >
        {jsonTest.map(marker => (
          <MapView.Marker coordinate={{latitude: marker.latitude, longitude: marker.longitude}}/>
        ))}
        {/*myLoop*/}
        {/*}<FlatList
          data={jsonTest}
          renderItem={({item}) => <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }} />}
          keyExtractor={(item) => item.id}
          />*/}
        {/*<Marker coordinate={jsonTest.coordinates} />*/}
        </MapView>
        </View>
          : final ?
          <View>
          <Button
            onPress={() => {
              console.log("back")
              setFinal(false)
            }}
            title={"back"}
          />
          <Text>{"\n"}Here is your final trip : {"\n"}</Text>
          <FlatList
            data={finalJson}
            renderItem={({ item }) => <Text> {item.name} {"\n"} </Text>}
            keyExtractor={(item) => item.id}
          />
          {/*<TouchableOpacity
            onPress={() => {
              const action = { type: 'SET_WAYPOINTS', value: finalJson };
              props.dispatch(action);
              props.navigation.navigate('TripNavigation');
            }}
          >
            <Text>Let's Go !</Text>
          </TouchableOpacity>*/}
          </View>
          : (
        <View>
            <ScrollView>
            <Text> {"\n"} {jsonObject.result.name} {"\n"}</Text>
            {!jsonObject.result.opening_hours ? <View/> : (
              <View>
              <FlatList
                data={jsonObject.result.opening_hours.weekday_text}
                renderItem={({ item }) => <Text> {item} </Text>}
                keyExtractor={(item) => item.id}
              />
            <Text> {"\n"} </Text>
            </View>
            )}
            {!jsonObject.result.types ? <View/> : (
              <FlatList
                data={jsonObject.result.types}
                renderItem={({ item }) => <Text> {item} </Text>}
                keyExtractor={(item) => item.id}
              />
            )}
            <Text> {"\n"} {jsonObject.result.formatted_address} {"\n"} </Text>
            {!jsonObject.result.website ? <View/> : (
            <Text> {jsonObject.result.website} {"\n"}</Text>
            )}
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
            </ScrollView>

            <View style={{marginBottom: 5}}>
              <Button
                onPress={() => {
                  finalJson.push(jsonObject.result)
                  setLocationMaps()

                  Toast.show({
                    title: 'Succes',
                    text:
                      'point added succesfully',
                    color: '#2ecc71',
                    timing: 2000,
                  })
                }}
                title={"add"}
              />

              <Button
                onPress={() => {
                  console.log("show_map")
                  setMaps(true)
                }}
                title={"show_map"}
              />
              <Button
                onPress={() => {
                  console.log("show_final")
                  setFinal(true)
                }}
                title={"show_final"}
              />
              <Button
              id={"button share 2"}
              onPress={() => {
                Share.share({
                    message: messagetext,
                    title: "Sortir avec Strollin'",
                    url: 'https://www.google.com',
                  }, {
                    // Android only:
                    dialogTitle: 'Share Strollin travel',
                    // iOS only:
                    excludedActivityTypes: [
                      'com.apple.UIKit.activity.PostToTwitter'
                    ]
                  });
                }}
                title={"share"}
                color="#3b5998"
                accessibilityLabel="Share"
              />
            </View>
        </View>
      )}
    </View>
    </Root>
  );
}

//const mapStateToProps = (state) => state;

export default Personal_trip;
