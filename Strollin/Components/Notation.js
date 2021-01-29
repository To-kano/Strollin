import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput
} from 'react-native';
import I18n from '../Translation/configureTrans';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import { connect } from 'react-redux';


let jsonDefault = {
    html_attributions: [],
    result: {
        formatted_address: "test",
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

function Notation(props) {
  const [value, onChangeValue] = React.useState("");
  const [jsonObject, onChangeJson] = React.useState(jsonDefault)
  const [isLoading, setLoading] = React.useState(props.defaultState);


  function sendMessage(value) {
    //console.log("i'm here")
    const url = `http://${IP_SERVER}:${PORT_SERVER}/location/get_place`
    fetch(url, {
      headers : {
              place_name : value
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
