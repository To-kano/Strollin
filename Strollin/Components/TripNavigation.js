import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet, AppState, View, Text, Button, BackHandler, Image, TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import AndroidPip from 'react-native-android-pip';
import I18n from '../Translation/configureTrans';
import Map from './map';
import { addUserHistoric } from '../apiServer/user';
import Store from '../Store/configureStore';
import { PopUpForm } from './PopUpForm';

export function TripNavigation({map, profil, dispatch, navigation}) {
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
    setTime();
  }, []);

  async function setTime() {
    let tmp = await Date.now();
    console.log("date = ", tmp);
    tmp = Math.floor(tmp / 1000);

    const action = { type: 'SET_TIME', value: tmp };
    dispatch(action);

    return tmp;
  }

  const { locations } = map;

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const deltaViewBackground = {
    latitudeDelta: 0.0052,
    longitudeDelta: 0.0121,
  };

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        <Text style={styles.text_header}>   My Trip</Text>
        <TouchableOpacity
          onPress={async () => {
            const store = Store.getState();
            addUserHistoric(store.profil.access_token, store.course.currentCourse.id);
            const action = { type: 'ADD_HISTORY', courseID: store.course.currentCourse.id };
            dispatch(action);
            const action2 = { type: 'ADD_COURSE_OBJECT_HISTORIC', value: store.course.currentCourse };
            dispatch(action2);
            navigation.navigate('CourseEvaluation');
            // await setTime()
            // await addUserHistoric(profil.access_token, map.course.id);
            // const action = { type: 'ADD_HISTORY', courseID: map.course.id };
            // dispatch(action);
            // navigation.navigate('HomePage');
            // await setTime();
            // const action = { type: 'ADD_HISTORIC', value: waypoints };
            // props.dispatch(action);
            // props.navigation.navigate('HomePage');
          }}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/close.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.view_destination}>
        <Image style={styles.img_header} source={require('../images/icons/black/next_trip.png')} />
        <Text numberOfLines={1}  style={styles.text_destination}>{locations[0].name}</Text>
      </View>
      <View style={styles.view_map}>
        <Map 
          navigation={navigation} 
          height="100%"
          width={390} 
          deltaView={deltaView} 
          locations={locations}
        />
      </View>
    </View>

    // <View style={styles.view_back}>
    //   <View style={styles.view_header}>
    //     <Text style={styles.text_header}>   My Trip</Text>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%', marginLeft: 15 }}
    //       onPress={() => navigation.navigate('HomePage')}
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
    //       onPress={() => navigation.navigate('historicUser')}
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
    //       onPress={() => navigation.navigate('TripSuggestion')}
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
    //       onPress={() => navigation.navigate('FriendList')}
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
    //       onPress={() => navigation.navigate('Profile')}
    //     >
    //       <Image style={styles.img_header} source={require('../images/icons/black/close.png')} />
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.fill}>
    //     <View style={{ flex: 0.1, margin: 5, flexDirection: 'row' }}>
    //       <View style={{ flex: 1 }}>
    //         <TouchableOpacity
    //           style={{ flex: 1 }}
    //           onPress={async () => {
    //             await setTime()
    //             await addUserHistoric(profil.access_token, map.course.id);
    //             const action = { type: 'ADD_HISTORY', courseID: map.course.id };
    //             dispatch(action);
    //             navigation.navigate('HomePage');
    //           }}
    //         >
    //           <Image
    //             style={{
    //               margin: '10%', height: '70%', width: '70%', opacity: 0.9, resizeMode: 'stretch'
    //             }}
    //             source={require('../ressources/end.png')}
    //           />
    //         </TouchableOpacity>
    //       </View>
    //       <Text style={{
    //         flex: 6, textAlign: 'center', fontSize: 30, color: '#F07323', fontWeight: 'bold'
    //       }}
    //       >
    //         {locations[0].name}
    //       </Text>
    //     </View>
    //     <View style={{ flex: 1 }}>
    //       <Map navigation={navigation} height="100%" width={390} deltaView={deltaView} locations={locations}/>
    //     </View>
    //   </View>
    // </View>


    // <View style={styles.back}>
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
    //         source={require('../ressources/plus.png')}
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
    //     <View style={{ flex: 0.1, margin: 5, flexDirection: 'row' }}>
    //       <View style={{ flex: 1 }}>
    //         <TouchableOpacity
    //           style={{ flex: 1 }}
    //           onPress={async () => {
    //             await setTime()
    //             const action = { type: 'ADD_HISTORIC', value: waypoints };
    //             props.dispatch(action);
    //             props.navigation.navigate('HomePage');
    //           }}
    //         >
    //           <Image
    //             style={{
    //               margin: '10%', height: '70%', width: '70%', opacity: 0.9, resizeMode: 'stretch'
    //             }}
    //             source={require('../ressources/end.png')}
    //           />
    //         </TouchableOpacity>
    //       </View>
    //       <Text style={{
    //         flex: 6, textAlign: 'center', fontSize: 30, color: '#F07323', fontWeight: 'bold'
    //       }}
    //       >
    //         {waypoints[0].name}
    //       </Text>
    //     </View>
    //     <View style={{ flex: 1 }}>
    //       <Map navigation={props.navigation} height="100%" width={390} deltaView={deltaView} waypoints={waypoints}/>
    //     </View>
    //   </View>
    // </View>
  );
}

const mapStateToProps = (state) => {
  return (
    {
      position: state.position,
      profil: state.profil,
      map: state.map
    }
  )
};
export default connect(mapStateToProps)(TripNavigation);

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
  view_destination: {
    flex: 50,
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF'
  },
  img_destination: {
    width: 25,
    resizeMode: 'contain',
  },
  text_destination: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    letterSpacing: 2,
    textAlign: 'left',
    color: '#000000',
  },
  view_map: {
    flex: 694,
    alignItems: 'center',
  },
  // back: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // fill: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  //   backgroundColor: '#FFFFFF',
  //   padding: 5,
  //   marginTop: 1,
  //   width: '100%',
  //   borderRadius: 5,
  //   opacity: 0.9,
  // },
  // header: {
  //   backgroundColor: '#FFFFFF',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.1,
  //   width: '100%',
  // },
});
