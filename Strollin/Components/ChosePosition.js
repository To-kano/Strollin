import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { getTimeZone } from 'react-native-localize';
import I18n from '../Translation/configureTrans';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import {GetPlaces} from '../apiServer/tag';
import { requestGeolocalisationPermission, updateCoordinates } from './map'
import Map from './map';
import MapView, { Marker } from 'react-native-maps';

export function Header({ navigation, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);
  const store = Store.getState();

  if (pressed === false) {
    return (
      <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          ChosePosition
        </Text>
        <TouchableOpacity
          onPress={() => { setpressed(!pressed); }}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/search.png')} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.view_header}>
      <TextInput
          autoCapitalize={'none'}
        style={styles.textInput_header}
        placeholder={I18n.t('Header.search_tag')}
      />
      <TouchableOpacity
        onPress={() => { setpressed(!pressed); }}
      >
        <Image style={styles.img_header} source={require('../images/icons/black/search.png')} />
      </TouchableOpacity>
    </View>
  );
}


export function ChosePosition(props, {map, profil, dispatch, navigation}) {
  const [displayMap, setDisplayMap] = useState(true);
  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const locations = {};
  const [region, setRegion] = useState({
    latitude: 48.8650988,
    longitude: 2.1931007,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  });
  const [markers, setMarkers] = useState(null)

  return (
    <View style={{ flex: 100 }}>
        <MapView
            style={{ flex: 100 }}
            region={region}
            onRegionChangeComplete={region => setRegion(region)}
            userLocationPriority="balanced"
            showsUserLocation
            onPress={(e) => setMarkers(e.nativeEvent.coordinate)}>
            {
                  markers &&
                  <MapView.Marker coordinate={markers} />
            }
        </MapView>
        <TouchableOpacity
          id="test"
          style={styles.view_newTrip}
          onPress={() => {
            let action = {
              type: 'ADD_POS',
              value: markers
            };
            Store.dispatch(action);
            action = {
              type: 'ADD_IS_MOVING',
              value: false
            };
            Store.dispatch(action);
            props.navigation.navigate('CourseSettings');
          }}
        >
          <Text style={styles.text_newTrip}>
            Chose starting position
          </Text>
        </TouchableOpacity>
      </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ChosePosition);

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
    width: '77.8%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  viex_list: {
    flex: 703,
    width: '100%',
  },
  text_field: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 12.5,
  },
  text_star: {
    fontWeight: 'bold',
    color: '#FF0000',
    fontSize: 16,
  },
  view_tags: {
    marginBottom: 9,
  },
  view_tagOff: {
    borderRadius: 25,
    borderWidth: 3,
    padding: 9,
    borderColor: '#000000',
    backgroundColor: '#E1E2E7',
  },
  text_tagOff: {
    textTransform: 'capitalize',
    width: '100%',
    height: 22,
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view_tagOn: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 3,
    padding: 9,
    borderColor: '#0092A7',
    backgroundColor: '#0092A7',
  },
  img_tagOn: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  text_tagOn: {
    textTransform: 'capitalize',
    width: '86%',
    height: 22,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view_button: {
    flex: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 45,
    marginTop: 12.5,
    marginBottom: 12.5,
    backgroundColor: '#0092A7',
  },
  text_button: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  view_newTrip: {
    flex: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 45,
    marginTop: 12.5,
    marginBottom: 35.5,
    backgroundColor: '#0092A7',
  },
});
