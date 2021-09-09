import React, { useCallback } from 'react';
import {
  ActivityIndicator, Linking, Alert, Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput, TouchableOpacity
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
import Store from '../Store/configureStore';
import { getCustomCourse } from '../apiServer/course';
const store = Store.getState();
import Geolocation from 'react-native-geolocation-service';
import { DrawerActions } from '@react-navigation/native';

let language = "en"
let finalJson = []
var myLoop = []
let jsonDefault = {}

let jsonTest = []
let jsonTmp = {}
let jsonTest2 = {
  "_id": "0",
  "id": "0",
  "owner": {
    "id": "0",
    "pseudo": "",
  },
  "owner_id": "",
  "owner_pseudo": "",
  "score": "0",
  "user_score": [],
  "latitude": 0,
  "longitude": 0,
  "description": "",
  "photo": [],
  "timetable": "",
  "comments_list": [],
  "price_range": [],
  "average_time": "",
  "phone": "",
  "website": "",
  "pop_disp": "",
  "pop_ag": "",
  "alg_disp": "",
  "alg_ag": "",
  "name": "",
  "address": "",
  "city": "",
  "country": "",
  "tags_list": [],
  "coordinate": [],
  "__v": 0
}

let locationPush = {
  "locations_list": [

  ],
  "status": "ok"
}

const deltaView = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

function Personal_trip(props) {

  function getJsonPush() {
    finalJson.forEach(json => {
      jsonTmp = jsonTest2
      jsonTmp.latitude = json.geometry.location.lat
      jsonTmp.longitude = json.geometry.location.lng
      for (var comment in json.review) {
        jsonTmp.comments_list.push(comment.text)
      }
      for (var tag in json.types) {
        jsonTmp.tags_list.push(tag)
      }
      jsonTmp.phone = json.international_phone_number
      jsonTmp.website = json.website
      jsonTmp.name = json.name
      jsonTmp.address = json.formatted_address
      locationPush.locations_list.push(jsonTmp)
    });
  }

  const [region, setRegion] = useState({
    latitude: 48.8650988,
    longitude: 2.1931007,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  });
  const [value, onChangeValue] = React.useState(" ");
  const [jsonObject, onChangeJson] = useState(jsonDefault)
  const [isLoading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState('0');
  const [isPermision, setPermision] = useState(false)
  const [localRegion, setLocalRegion] = useState({
    latitudeDelta: deltaView.latitudeDelta,
    longitudeDelta: deltaView.longitudeDelta
  });
  const [maps, setMaps] = useState(false)
  const [final, setFinal] = useState(false)
  const [finalCourse, setCourse] = useState([])

  useEffect(() => {
    setLocalRegion({
      ...localRegion,
      ...userPosition,
    });
  }, [userPosition]);

  useEffect(() => {
  //console.log("POSITION DE DÉPART ", userPosition);
    const courseSend = getCustomCourse(store.profil.access_token);
    setCourse(courseSend)
    if (props.asked == false) {
      requestGeolocalisationPermission(Store.dispatch);
    }
    if (props.permission == true && userPosition == null) {
      updateCoordinates(setUserPosition);
    }
    if (props.permission && userPosition && localRegion.latitude && localRegion.longitude) {
      setPermision(true)
      let regionTmp = region
      regionTmp.longitude = userPosition.longitude
      regionTmp.latitude = userPosition.latitude
      setRegion(regionTmp)
    //console.log("JE SET LA RÉGION 1: ", userPosition);
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      //console.log("pritn de pierre: ", position);
        setUserPosition(data);
        let regionTmp = region
        regionTmp.longitude = data.longitude
        regionTmp.latitude = data.latitude
        setRegion(regionTmp)
      //console.log("JE SET LA RÉGION 2: ", userPosition);
      },
      (error) => {
      //console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, [])

  if (Array.isArray(locales)) {
    language = locales[0].languageTag;
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
    const url = `https://${IP_SERVER}:${PORT_SERVER}/location/get_place`
    fetch(url, {
      headers: {
        place_name: value,
        locationlat: region.latitude,
        locationlong: region.longitude,
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
//console.log("______________________________________________" + day)*/

  const [showLoader, setLoader] = useState(<View />);
  const searchBar = (
    <>
      <Text style={styles.text_info}>Où voulez vous allez :</Text>
      <View style={styles.view_search}>
        <TextInput
          onChangeText={(text) => onChangeValue(text)}
          value={value}
          style={styles.textInput_search}
        />
        <TouchableOpacity onPress={() => { sendMessage(value); setLoading(true); setLoader(<ActivityIndicator style={{ marginTop: '75%' }} size="large" color="#0092A7" />) }}>
          <Image style={styles.img_search} source={require('../images/icons/black/search.png')} />
        </TouchableOpacity>
      </View>
    </>);

  const mapView = (
    <View style={styles.view_list}>
      <Button
        onPress={() => {
          setMaps(false)
        }}
        title={"back"}
      />
      <MapView
        style={{ height: '80%', width: '106.5%', marginLeft: "-3.25%" }}
        showsCompass
        userLocationPriority="balanced"
        region={region}
      >
        {jsonTest.map(marker => (
          <MapView.Marker coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} />
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
  );

  const finalView = (
    <>
      <TouchableOpacity 
        style={styles.button_retour}
        onPress={() => {
        //console.log("\n\nback")
          setFinal(false)
        }}>
        <Image style={styles.img_header} source={require('../images/icons/black/return.png')} />
      </TouchableOpacity>
      <View style={styles.view_list}>
        <Text style={styles.text_result_title}>Votre trajet final</Text>
        <View style={styles.view_result_list}>
          {finalJson.length === 0 && 
            <View style={styles.empty_list}>
              <Image style={styles.img_empty} source={require('../images/logo/marker_empty.png')} />
              <Text style={{ textAlign: 'center' }}>Votre trajet est vide..</Text>
            </View>
          }
          {finalJson.length > 0 && 
            <FlatList
              data={finalJson}
              renderItem={({ item }) => (
                <View style={styles.view_result_tags}>
                  <Image style={styles.img_tag} source={require('../images/logo/marker_small.png')} />
                  <Text style={styles.text_tag}>{item.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          }
        </View>
        <TouchableOpacity
          style={styles.view_show_final}
          onPress={async () => {
            await getJsonPush()
          //console.log("course: ", finalCourse, " \nlost: ", locationPush.locations_list);
            const action = { type: 'SET_WAYPOINTS', course: finalCourse, locations: locationPush.locations_list };
            Store.dispatch(action);
            props.navigation.navigate('TripNavigation');
          }}
        >
          <Text style={styles.text_show_final}>Lets Go !</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const OpenLinkText = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return (<TouchableOpacity><Text>{children.split('/')[2]}</Text></TouchableOpacity>);
  };

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.new_trip')}
          {'   '}
        </Text>
      </View>
      {maps || final ? <View /> : searchBar}
      {isLoading ? <View style={{flex: 757}}/>
        : maps ? mapView
          : final ? finalView
            : (
              <View style={styles.view_result}>
                <ScrollView style={{ marginTop: 5, marginBottom: 70 }}>
                  <View style={styles.view_result_header}>
                    <Text style={styles.text_result_name}>{jsonObject.result.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity 
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
                      >
                        <Image style={styles.img_result_header} source={require('../images/icons/black/share.png')} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.view_add_trip}
                        onPress={() => {
                          finalJson.push(jsonObject.result)
                          setLocationMaps()

                          // Toast.show({
                          //   title: 'Succes',
                          //   text:
                          //     'point added succesfully',
                          //   color: '#2ecc71',
                          //   timing: 2000,
                          // })
                        }}
                      >
                        <Text style={styles.text_add_trip}>Add to trip</Text>
                        <Image style={styles.img_add_trip} source={require('../images/icons/black/addMap.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {!jsonObject.result.opening_hours ? <View /> : (
                    <>
                      <Text style={styles.text_result_title}>Horaires :</Text>
                      <View style={styles.view_result_list}>
                        <FlatList
                          data={jsonObject.result.opening_hours.weekday_text}
                          renderItem={({ item }) => (
                            <View style={styles.view_result_hours}>
                              <Text style={{ }}>
                                {item.split(':')[0]} : 
                              </Text>
                              <Text style={{fontWeight: 'bold', }}>
                                { item.split(':')[1] }{':'}
                                { item.split(':')[2] }{':'}
                                { item.split(':')[3] }
                                { item.split(':')[4] } 
                              </Text>
                            </View>
                          )}
                          keyExtractor={(item) => item.id}
                        />
                      </View>
                    </>
                  )}
                  {!jsonObject.result.types ? <View /> : (
                    <>
                      <Text style={styles.text_result_title}>Tags :</Text>
                      <View style={styles.view_result_list}>
                        <FlatList
                          data={jsonObject.result.types}
                          renderItem={({ item }) => (
                              <View style={styles.view_result_tags}>
                                <Image style={styles.img_tag} source={require('../images/logo/marker_small.png')} />
                                <Text style={styles.text_tag}>{item}</Text>
                              </View>
                            )}
                          keyExtractor={(item) => item.id}
                        />
                        </View>
                    </>
                  )}
                  <Text style={styles.text_result_title}>Adresse :</Text>
                  <View style={styles.view_result_list}>
                    <View style={styles.view_result_tags} >
                      <Image style={styles.img_tag} source={require('../images/icons/black/map.png')} />
                      <Text style={styles.text_tag}>{jsonObject.result.formatted_address}</Text>
                    </View>
                  </View>
                  {!jsonObject.result.website ? <View /> : (
                    <>
                    <Text style={styles.text_result_title}>Web Site :</Text>
                    <View style={styles.view_result_list}>
                      <View style={styles.view_result_tags}>
                        <Image style={styles.img_tag} source={require('../images/icons/black/www.png')} />
                        <OpenLinkText url={jsonObject.result.website}>{jsonObject.result.website}</OpenLinkText>
                      </View>
                    </View>
                  </>
                  )}
                </ScrollView>
                <TouchableOpacity 
                  onPress={() => {
                  //console.log("show_final")
                    setFinal(true)
                  }}
                  style={styles.view_show_final}
                >
                  <Text style={styles.text_show_final}>Voir mon trajet</Text>
                  {/* <Image style={styles.img_show_final} source={require('../images/icons/black/finalMap.png')} /> */}
                </TouchableOpacity>
              </View>
              // <View style={{ marginBottom: 5 }}>

              //   <Button
              //     onPress={() => {
              //     //console.log("show_map")
              //       setMaps(true)
              //     }}
              //     title={"show_map"}
              //   />
              // </View>
            )}
    </View>

    /* <Text style={styles.text_info}>Adresse de votre commerce :</Text>
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
    </View> */

    // <Root>
    // <View>
    // {maps || final ? <View/> : (
    //     <View>
    //       <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{"Personal trip"}</Text>
    //       <TextInput
    //         onChangeText={(text) => onChangeValue(text)}
    //         value={value}
    //         style={{ borderWidth: 1 }}
    //       />
    //       <Button
    //         onPress={() => {
    //           sendMessage(value);
    //         }}
    //         title={"search"}
    //         color="#841584"
    //       />
    //     </View>
    //   )}
    //     {isLoading ? <View/> : maps ?
    //     <View>
    //     <Button
    //       onPress={() => {
    //       //console.log("back")
    //         setMaps(false)
    //       }}
    //       title={"back"}
    //     />
    //     <MapView
    //     style={{ height: 601, width: 400, marginTop: 5 }}
    //     showsCompass
    //     userLocationPriority="balanced"
    //     region={region}
    //     >
    //     {jsonTest.map(marker => (
    //       <MapView.Marker coordinate={{latitude: marker.latitude, longitude: marker.longitude}}/>
    //     ))}
    //     {/*myLoop*/}
    //     {/*}<FlatList
    //       data={jsonTest}
    //       renderItem={({item}) => <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }} />}
    //       keyExtractor={(item) => item.id}
    //       />*/}
    //     {/*<Marker coordinate={jsonTest.coordinates} />*/}
    //     </MapView>
    //     </View>
    //       : final ?
    //       <View>
    //       <Button
    //         onPress={() => {
    //         //console.log("back")
    //           setFinal(false)
    //         }}
    //         title={"back"}
    //       />
    //       <Text>Here is your final trip :</Text>
    //       <FlatList
    //         data={finalJson}
    //         renderItem={({ item }) => <Text> {item.name} </Text>}
    //         keyExtractor={(item) => item.id}
    //       />
    //       <TouchableOpacity
    //         onPress={async () => {
    //           await getJsonPush()
    //         //console.log("course: ", finalCourse, " \nlost: ", locationPush.locations_list );
    //           const action = { type: 'SET_WAYPOINTS', course: finalCourse, locations: locationPush.locations_list };
    //           Store.dispatch(action);
    //           props.navigation.navigate('TripNavigation');
    //         }}
    //       >
    //         <Text>Lets Go !</Text>
    //       </TouchableOpacity>
    //       </View>
    //       : (
    //     <View>
    //         <ScrollView>
    //         <Text> {jsonObject.result.name}</Text>
    //         {!jsonObject.result.opening_hours ? <View/> : (
    //           <View>
    //           <FlatList
    //             data={jsonObject.result.opening_hours.weekday_text}
    //             renderItem={({ item }) => <Text> {item} </Text>}
    //             keyExtractor={(item) => item.id}
    //           />
    //         <Text> </Text>
    //         </View>
    //         )}
    //         {!jsonObject.result.types ? <View/> : (
    //           <FlatList
    //             data={jsonObject.result.types}
    //             renderItem={({ item }) => <Text> {item} </Text>}
    //             keyExtractor={(item) => item.id}
    //           />
    //         )}
    //         <Text> {jsonObject.result.formatted_address} </Text>
    //         {!jsonObject.result.website ? <View/> : (
    //         <Text> {jsonObject.result.website}</Text>
    //         )}
    //         {/*<FlatList
    //           data={jsonObject.result.photos}
    //           renderItem={({ item }) =>
    //           <Image
    //             source={{
    //               uri: item.html_attributions[0],
    //             }}
    //           />}
    //           keyExtractor={(item) => item.id}
    //         />*/}
    //         </ScrollView>

    //         <View style={{marginBottom: 5}}>
    //           <Button
    //             onPress={() => {
    //               finalJson.push(jsonObject.result)
    //               setLocationMaps()

    //               Toast.show({
    //                 title: 'Succes',
    //                 text:
    //                   'point added succesfully',
    //                 color: '#2ecc71',
    //                 timing: 2000,
    //               })
    //             }}
    //             title={"add"}
    //           />

    //           <Button
    //             onPress={() => {
    //             //console.log("show_map")
    //               setMaps(true)
    //             }}
    //             title={"show_map"}
    //           />
    //           <Button
    //             onPress={() => {
    //             //console.log("show_final")
    //               setFinal(true)
    //             }}
    //             title={"show_final"}
    //           />
    //           <Button
    //           id={"button share 2"}
    //           onPress={() => {
    //             Share.share({
    //                 message: messagetext,
    //                 title: "Sortir avec Strollin'",
    //                 url: 'https://www.google.com',
    //               }, {
    //                 // Android only:
    //                 dialogTitle: 'Share Strollin travel',
    //                 // iOS only:
    //                 excludedActivityTypes: [
    //                   'com.apple.UIKit.activity.PostToTwitter'
    //                 ]
    //               });
    //             }}
    //             title={"share"}
    //             color="#3b5998"
    //             accessibilityLabel="Share"
    //           />
    //         </View>
    //     </View>
    //   )}
    // </View>
    // </Root>
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
  view_result: {
    flex: 757,
  },
  view_result_header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  img_result_header: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
    marginRight: 10,
  },
  text_result_name: {
    maxWidth: '53%',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  text_result_title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
  },
  view_result_list: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  view_result_hours: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: 2
  },
  view_result_tags: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  img_tag: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  text_tag: {
    textTransform: 'capitalize',
  },
  view_show_final: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 100,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    backgroundColor: '#0092A7',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  text_show_final: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  img_show_final: {
    tintColor: '#fff',
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  empty_list: {
    justifyContent: 'center',
    paddingVertical: '25%',
  },
  img_empty: {
    width: '100%',
    height: 100,
    marginBottom: '10%',
    resizeMode: 'contain',
  },
  button_retour: {
    position: 'absolute',
    top: -5,
    right: 10,
  },
  view_add_trip: {
    marginRight: 1,
    flexDirection: 'row',
    backgroundColor: '#0092A7',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    // elevation: 5,
  },
  text_add_trip: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  img_add_trip: {
    tintColor: '#fff',
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft: 10,
  }
});

const mapStateToProps = (state) => (
  {
    position: state.position,
    profil: state.profil,
    map: state.map
  }
);
//const mapStateToProps = (state) => state;

export default (Personal_trip);
