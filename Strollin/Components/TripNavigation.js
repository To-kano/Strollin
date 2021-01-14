import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet, AppState, View, Text, Button, BackHandler, Image, TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import AndroidPip from 'react-native-android-pip';
import I18n from '../Translation/configureTrans';
import Map from './map';

import { PopUpForm } from './PopUpForm';

export function TripNavigation(props) {
  //const [background, setBackground] = useState(false);
//
  //useEffect(() => {
  //  const backAction = () => {
  //    AndroidPip.enterPictureInPictureMode();
  //    return true;
  //  };
//
  //  const backHandler = BackHandler.addEventListener(
  //    'hardwareBackPress',
  //    backAction
  //  );
//
  //  return () => backHandler.remove();
  //}, []);
//
  //useEffect(() => {
  //  const handleAppStateChange = (nextAppState) => {
  //    if (nextAppState === 'background') {
  //      AndroidPip.enterPictureInPictureMode();
  //    } else {
  //    }
  //  };
//
  //  AppState.addEventListener('change', handleAppStateChange);
//
  //  return () => {
  //    AppState.removeEventListener('change', handleAppStateChange);
  //  };
  //}, []);

  useEffect(() => {
    setTime()
  }, [])

  async function setTime() {
    let tmp = await Date.now()
    console.log(tmp)
    tmp = Math.floor(tmp/1000)

    const action = { type: 'SET_TIME', value: tmp };
    props.dispatch(action);

    return tmp
  }

  const { waypoints } = props.map;

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const deltaViewBackground = {
    latitudeDelta: 0.0052,
    longitudeDelta: 0.0121,
  };

  return (
    <View style={styles.back}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ width: '20%', height: '100%', marginLeft: 15 }}
          onPress={() => props.navigation.navigate('HomePage')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/home.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('historicUser')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/plus.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/plus.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('FriendList')}
        >
          <Image
            style={{
              marginTop: '10%', height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/friend.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/profile.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.fill}>
        <View style={{ flex: 0.1, margin: 5, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={async () => {
                await setTime()
                const action = { type: 'ADD_HISTORIC', value: waypoints };
                props.dispatch(action);
                props.navigation.navigate('HomePage');
              }}
            >
              <Image
                style={{
                  margin: '10%', height: '70%', width: '70%', opacity: 0.9, resizeMode: 'stretch'
                }}
                source={require('../ressources/end.png')}
              />
            </TouchableOpacity>
          </View>
          <Text style={{
            flex: 6, textAlign: 'center', fontSize: 30, color: '#F07323', fontWeight: 'bold'
          }}
          >
            {waypoints[0].name}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Map navigation={props.navigation} height="100%" width={390} deltaView={deltaView} waypoints={waypoints}/>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(TripNavigation);

const styles = StyleSheet.create({
  back: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginTop: 1,
    width: '100%',
    borderRadius: 5,
    opacity: 0.9,
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
  },
});
