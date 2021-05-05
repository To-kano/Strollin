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
import { IP_SERVER, PORT_SERVER } from '../env/Environement';

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

  const [pop, setPop] = useState(false);
  const [course, setCourse] = useState(null);
  const [place, setPlace] = useState(null);

  function compare(a, b) {
    if (a.Dist > b.Dist) return 1;
    if (b.Dist > a.Dist) return -1;
  }

  async function PopUpResponse(response, pos, course, popup) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    const coordinate = [];
    const test = JSON.stringify({course: course, popup: popup})
    coordinate[0] = pos.latitude;
    coordinate[1] = pos.longitude;

    console.log("\n*\n*\n*\n*", locations[0])
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/generator/popup_answer`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_Token,
      coordinate: coordinate,
      answer: response
    },
    body: test,
    method: 'POST',
    })
    .then(res => res.json())
    .then(json => {
      //console.log("\n\n\n\n\n\npleasssssssssse: ", json);
      setPop(false);
    });

    if (response == false)
      return
    //update course
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/get_locations_by_id`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_Token,
      locations_id_list: [popup.Id]
    },
    method: 'GET',
    })
    .then(res => res.json())
    .then(json => {
      //console.log("location stp frero: ", json.locations_list[0]);
      let test_loc = locations
      test_loc.push(json.locations_list[0])
      test_loc.sort(compare)
      const action = { type: 'SET_LOCATIONS', locations: test_loc };
      Store.dispatch(action);
    });
  }

  async function PopUpReq(pos, course) {
    console.log("course: ", course);
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    console.log("pos: ", pos);
    console.log("token: ", access_Token);
    const coordinate = [];
    const test = JSON.stringify({course: course})
    coordinate[0] = pos.latitude;
    coordinate[1] = pos.longitude;

    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/generator/generate_popup`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_Token,
      coordinate: coordinate
    },
    body: test,
    method: 'POST',
    })
    .then(res => res.json())
    .then(json => {
      console.log("JJJJJJJJJJJJSSSSSSSSSSSSSSSSOOOOOOOOOONNNNNNNNNn: ", json);
      setCourse(json.popup)
      setPop(true);
      console.log("stp c la le truc: ", json.popup);
    });

  }

  console.log("\n*\n*\n*\n*", locations)

  useEffect(() => {
    console.log("ceci est locations\n\n", locations)
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

  if (pop) {
    return (
      <View>
      <Text>
        Do you want to go to : {course.Name}
      </Text>
      <Button
        title="yes"
        onPress={() => PopUpResponse(true, profil.first_name, profil.scoreCourse, course)}
      />
      <Button
        title="no"
        onPress={() => PopUpResponse(false, profil.first_name, profil.scoreCourse, course)}
      />
    </View>
    )}
  else {
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
      <TouchableOpacity onPress={() => {
        const store = Store.getState();
        PopUpReq(profil.first_name, profil.scoreCourse); //Je sais pas utiliser les props du coup g stocker des truc dans les props dans course settings
      }}>
        <Text style={styles.text_signIn}>{I18n.t('LoginPage.SIGNIN')}</Text>
      </TouchableOpacity>
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
  text_signIn: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 12,
    color: '#0092A7',
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
