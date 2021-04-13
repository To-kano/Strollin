import React, { Component, useState, useEffect } from 'react';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, FlatList, Image, PermissionsAndroid, TouchableOpacity,
} from 'react-native';
import I18n from '../Translation/configureTrans';
import Map from './map';

import ElementHistoryNav from './HistoryElement';
import BackgroundImage from './backgroundImage';
import ButtonSwitch from './ButtonSwitch';

function getNavigation() {
  const destination1 = [
    {
      id: '1',
      latitude: 48.782120,
      longitude: 2.457256,
      address: 'Avenue Du Général De Gaulle, Centre Commercial Régional Créteil-Soleil, 94000 Créteil',
      name: 'UGC Ciné Cité Créteil',
    },
    {
      id: '2',
      latitude: 48.769907,
      longitude: 2.490415,
      address: 'P.A des Petits Carreaux, 94380 Bonneuil-sur-Marne',
      name: 'Hippopotamus Bonneuil',
    }, {
      id: '3',
      latitude: 48.781282,
      longitude: 2.456508,
      address: 'Avenue de la France libre, 94000 Créteil',
      name: 'Laser Game',
    }
  ];

  const destination2 = [
    {
      id: '1',
      latitude: 48.866606,
      longitude: 2.335573,
      address: '37 Rue Sainte-Anne, 75001 Paris',
      name: 'Sapporo',
    },
    {
      id: '2',
      latitude: 48.869098,
      longitude: 2.370088,
      address: '14 Rue de la Fontaine au Roi, 75011 Paris',
      name: 'Le Paname Art Café',
    }, {
      id: '3',
      latitude: 48.850353,
      longitude: 2.352838,
      address: '6 Rue Cochin, 75005 Paris',
      name: 'La Frange',
    }
  ];

  const destination3 = [
    {
      id: '1',
      latitude: 48.798683,
      longitude: 2.446183,
      address: '6 Rue Thomas Edison, 94000 Créteil',
      name: 'Centre Sportif Marie-Thérèse Eyquem',
    },
    {
      id: '2',
      latitude: 48.780627,
      longitude: 2.457364,
      address: 'Centre commercial Créteil Soleil, 101 Avenue du Général de Gaulle, 94012 Créteil',
      name: 'Restaurant Flunch Creteil Soleil',
    }, {
      id: '3',
      latitude: 48.790379,
      longitude: 2.465619,
      address: '75 Avenue Pierre Brossolette, 94000 Creteil village',
      name: 'Le Foz Club discothèque',
    }
  ];

  const allDestination = [
    destination1,
    destination2,
    destination3
  ];

  const rand = Math.floor(Math.random() * Math.floor(3));

  return allDestination[rand];
}

export function TripSuggestion(props) {
  //React.useLayoutEffect(() => {
  //  props.navigation.setOptions({
  //    // headerRight: () => (
  //    //   <Button
  //    //       title="Log Out"
  //    //       color="#89B3D9"
  //    //       onPress={() =>
  //    //         props.navigation.navigate('userLogin')
  //    //       }
  //    //     />
  //    // ),
  //  });
  //}, [props.navigation]);

  const [waypoints, setWaypoints] = useState(getNavigation());

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');

    if (props.profil.sound) {
      for (let i = 0; i < waypoints.length; i++) {
        Tts.speak(`${I18n.t("TripSuggestion.step")} ${i + 1}`);
        Tts.speak(waypoints[i].name);
      }
    }
  }, [waypoints]);

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Menu')}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')}/>
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.new_trip')}
          {'    '}
        </Text>
      </View>
      <View style={styles.viex_list}>
        <ElementHistoryNav data={waypoints} />
      </View>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          const action = { type: 'SET_WAYPOINTS', value: waypoints };
          props.dispatch(action);
          props.navigation.navigate('TripNavigation');
        }}
      >
        <Text style={styles.text_button}>
          {I18n.t('TripSuggestion.lets_go')}
        </Text>
      </TouchableOpacity>
    </View>
    // <View style={styles.back}>
    //   <BackgroundImage />
    //   <View style={styles.header}>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%', marginLeft: 15 }}
    //       onPress={() => props.navigation.navigate('HomePage')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/home.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%' }}
    //       onPress={() => props.navigation.navigate('historicUser')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/trip.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%' }}
    //       onPress={() => props.navigation.navigate('TripSuggestion')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/plus.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%' }}
    //       onPress={() => props.navigation.navigate('FriendList')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/friend.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%' }}
    //       onPress={() => props.navigation.navigate('Profile')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/profile.png')}
    //       />
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.fill}>
    //     <View style={{
    //       justifyContent: 'space-around',
    //       marginTop: 10,
    //       paddingLeft: 5,
    //       paddingBottom: 10,
    //       backgroundColor: '#FFFFFF',
    //       borderRadius: 5,
    //       borderColor: '#BABABA',
    //       borderWidth: 1,
    //       width: '95%'
    //     }}
    //     >
    //       <Text style={[{ fontSize: 20, opacity: 0.5, margin: 5 }]}>Heading to:</Text>
    //       <Text style={[{
    //         textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: '#F07323'
    //       }]}
    //       >
    //         {waypoints[0].name}
    //       </Text>
    //     </View>
    //     <View
    //       style={{
    //         flex: 3,
    //         marginTop: 15,
    //         justifyContent: 'space-around',
    //         paddingLeft: 5,
    //         backgroundColor: '#FFFFFF',
    //         borderRadius: 5,
    //         borderColor: '#BABABA',
    //         borderWidth: 1,
    //         width: '95%'
    //       }}
    //     >
    //       <ElementHistoryNav data={waypoints} />
    //     </View>
    //     <View style={{
    //       flex: 0.4,
    //       flexDirection: 'row',
    //       justifyContent: 'space-around',
    //       alignItems: 'center',
    //       padding: 10,
    //     }}
    //     >
    //       <View style={{ flex: 1, paddingTop: 10, marginRight: 10 }}>
    //         <Button
    //           title="Another One!"
    //           color="#89B3D9"
    //           onPress={() => setWaypoints(getNavigation())}
    //         />
    //       </View>
    //       <View style={{ flex: 1, paddingTop: 10, marginRight: 10 }}>
    //         <Button
    //           title="Let's go!"
    //           color="#F07323"
    //           onPress={() => {
    //             const action = { type: 'SET_WAYPOINTS', value: waypoints };
    //             props.dispatch(action);
    //             props.navigation.navigate('TripNavigation');
    //           }}
    //         />
    //       </View>
    //     </View>
    //   </View>
    // </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TripSuggestion);

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
  viex_list: {
    flex: 712,
    backgroundColor: 'red'
  },
  view_button: {
    flex: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 45,
    marginBottom: 12.5,
    backgroundColor: '#0092A7',
  },
  text_button: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  }
  // back: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  // },
  // fill: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  //   backgroundColor: '#FFFFFF',
  //   padding: 5,
  //   marginTop: 10,
  //   marginBottom: 10,
  //   width: '95%',
  //   borderRadius: 5,
  //   opacity: 0.9,
  // },
  // header: {
  //   backgroundColor: '#FFFFFF',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.08,
  //   width: '100%',
  // },
  // newTrip: {
  //   alignItems: 'center',
  //   backgroundColor: '#F07323',
  //   paddingVertical: '5%',
  //   paddingHorizontal: '30%',
  //   borderRadius: 5,
  // }
});
