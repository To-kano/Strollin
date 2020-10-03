import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Button, Image, PermissionsAndroid
} from 'react-native';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';
import Map from './map';
import I18n from "../Translation/configureTrans";

import ElementHistoryNav from './HistoryElement';
import BackgroundImage from './backgroundImage';

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

function TripSuggestion(props) {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          title={I18n.t("logOut")}
          color="#89B3D9"
          onPress={() => props.navigation.navigate('userLogin')}
        />
      ),
    });
  }, [props.navigation]);

  const [waypoints, setWaypoints] = useState(getNavigation());

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');

    for (let i = 0; i < waypoints.length; i++) {
      Tts.speak(`Step ${i + 1}`);
      Tts.speak(waypoints[i].name);
    }
  }, [waypoints]);

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <BackgroundImage />
      <View style={{
        justifyContent: 'space-around', flex: 1, marginTop: 20, marginHorizontal: '10%', backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 20, width: '80%'
      }}
      >
        <Text style={[{
          textAlign: 'center', fontSize: 20, color: '#39A5D6', margin: 5
        }]}
        >
          {I18n.t("heading")}
        </Text>
        <Text style={[{ textAlign: 'center', fontSize: 25 }]}>{waypoints[0].name}</Text>
      </View>
      <View style={{
        flex: 3, marginTop: 50, backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 10, width: '80%'
      }}
      >
        <ElementHistoryNav data={waypoints} />
      </View>
      <View style={{
        flex: 0.3, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, marginBottom: 10
      }}
      >
        <Button
          title={I18n.t("anotherOneBitesTheDust")}
          color="#EEB015"
          onPress={() => setWaypoints(getNavigation())}
        />
        <Button
          title={I18n.t("letsGo")}
          color="#89B3D9"
          onPress={() => {
            const action = { type: 'SET_WAYPOINTS', value: waypoints };
            props.dispatch(action);
            props.navigation.navigate('TripNavigation');
          }}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TripSuggestion);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
