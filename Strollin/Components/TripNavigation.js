import React, { Component , useState, useEffect} from 'react';
import {StyleSheet, AppState, View, Text, Button, BackHandler, Image, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';

import Map from './map';
import AndroidPip from 'react-native-android-pip';


function TripNavigation(props) {

  useEffect(() => {
    const backAction = () => {
      AndroidPip.enterPictureInPictureMode();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  useEffect(() => {

    const _handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
        AndroidPip.enterPictureInPictureMode();
     }
    }

    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      const _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'background') {
          AndroidPip.enterPictureInPictureMode();
       }
      }
  
      AppState.removeEventListener('change',_handleAppStateChange)
    };
  }, []);




  const waypoints = props.map.waypoints;

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  //Map.region = {
  //  latitude: props.position.position.latitude,
  //  longitude: props.position.position.longitude,
  //  latitudeDelta: deltaView.latitudeDelta,
  //  longitudeDelta: deltaView.longitudeDelta
  //}

  return (
    <View style={styles.back}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{width: '20%', height: '100%', marginLeft: 15}}
          onPress={() => props.navigation.navigate('HomePage')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/home.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('historicUser')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/history.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/plus.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => console.log('friend')}
        >
          <Image style={{marginTop: "10%", height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/friend.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/profile.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.fill}>
        <View style={{flex: 0.1, margin: 5, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                const action = {type: 'ADD_HISTORIC', value : waypoints}
                props.dispatch(action)
                props.navigation.navigate('HomePage')
              }}
            >
              <Image style={{margin: "10%", height: '70%', width: '70%', opacity: 0.9, resizeMode: 'stretch'}} source={require('../ressources/end.png')} />
            </TouchableOpacity>
          </View>
          <Text style={{flex: 6, textAlign:"center", fontSize: 30, color: "#F07323", fontWeight: "bold"}}>{waypoints[0].name}</Text>
        </View>
        <View style={{flex: 1}}>
          <Map height={"100%"} width={390} deltaView={deltaView} waypoints={waypoints} />
        </View>
      </View>
    </View>
  );

}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(TripNavigation);


const styles = StyleSheet.create({
  back: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
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
