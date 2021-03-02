import React, { Component, useState, useEffect } from 'react';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button, Image, PermissionsAndroid, TouchableOpacity
} from 'react-native';
import I18n from '../Translation/configureTrans';
import Map from './map';

import ElementHistoryNav from './HistoryElement';
import BackgroundImage from './backgroundImage';
import ButtonSwitch from './ButtonSwitch';

function getNavigation() {

  const destination = 
  {
    "_id":
    {
      "$oid":"5ff32c7640659a00230b1687"
    },
    "locations_list":["5ff31d40977cba001e801bfa", "5ff47553765c6f001fff5b6f"],
    "score":"0",
    "user_score":[],
    "number_used":"0",
    "timetable":"",
    "comments_list":["5ff4773e765c6f001fff5b71"],
    "tags_list":[],
    "time_spent":[],
    "name":"HA HA HA HA!",
    "author":"Strollin",
    "creation_date":
    {
      "$date":"2021-01-04T14:55:50.106Z"
    },
    "__v":0
  };

  return destination;


  //return allDestination[rand];
}

function getLocation(id) {
  const location1 =
  {
    "_id":"5ff31d40977cba001e801bfa",
    "owner":"2nd owner",
    "score":"0",
    "user_score":[],
    latitude: 48.798683,
    longitude: 2.446183,
    "description":"Peko",
    "photo":[],
    "timetable":"test",
    "comments_list":["5ff3277dd90060001daaf045"],
    "price_range":["",""],
    "average_time":"",
    "phone":"",
    "website":"",
    "pop_disp":"0",
    "pop_ag":"0",
    "alg_disp":"0",
    "alg_ag":"0",
    "name":"Une troisieme Maison",
    "address":"369, rue Sandvich",
    "city":"Creteil",
    "country":"France",
    "tags_list":[{"_id":{"$oid":"5ff31d40977cba001e801bfb"}}],
    "__v":0
  }

  const location2 = 
  {
    "_id":"5ff47553765c6f001fff5b6f",
    "owner":"thisID","score":"0","user_score":[],
    latitude: 48.780627,
    longitude: 2.457364,
    "description":"HAHAHAHA",
    "photo":[],
    "timetable":"Du lundi au Vendredi",
    "comments_list":[],
    "tags_list":[{"id":"tag1","disp":"0"}],
    "price_range":["",""],
    "average_time":"",
    "phone":"","website":"",
    "pop_disp":"0",
    "pop_ag":"0",
    "alg_disp":"0",
    "alg_ag":"0",
    "name":"Ma premiere Maison",
    "address":"369, rue Sandvich",
    "city":"Creteil",
    "country":"France",
    "__v":0
  }

  if (id == "5ff47553765c6f001fff5b6f") {
    return location2;
  }

  return location1;
}

function getArrayLocation(idLocations) {
  let result = [];
  for (let i = 0; i < idLocations.length; i++) {
    result.push(getLocation(idLocations[i]));
  }

  return result
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

  const [course, setCourse] = useState(getNavigation());

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');

    if (props.profil.sound) {
      for (let i = 0; i < course.length; i++) {
        Tts.speak(`${I18n.t("TripSuggestion.step")} ${i + 1}`);
        Tts.speak(course.name);
      }
    }

    if (course.locations_list) {
      setLocations(getArrayLocation(course.locations_list))
    }

  }, [course]);

  const [locations, setLocations] = useState(null);


  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.back}>
      <BackgroundImage />
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
            source={require('../ressources/trip.png')}
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
        <View style={{
          justifyContent: 'space-around',
          marginTop: 10,
          paddingLeft: 5,
          paddingBottom: 10,
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
          borderColor: '#BABABA',
          borderWidth: 1,
          width: '95%'
        }}
        >
          <Text style={[{ fontSize: 20, opacity: 0.5, margin: 5 }]}>{I18n.t('TripSuggestion.headingTo')}</Text>
          <Text style={[{
            textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: '#F07323'
          }]}
          >
            {course.name}
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            marginTop: 15,
            justifyContent: 'space-around',
            paddingLeft: 5,
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            borderColor: '#BABABA',
            borderWidth: 1,
            width: '95%'
          }}
        >
          <ElementHistoryNav course={course} locations={locations}/>
        </View>
        <View style={{
          flex: 0.4,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 10,
        }}
        >
          <View style={{ flex: 1, paddingTop: 10, marginRight: 10 }}>
            <Button
              title="Another One!"
              color="#89B3D9"
              onPress={() => {
                Tts.stop();
                setCourse(getNavigation());
              }}
            />
          </View>
          <View style={{ flex: 1, paddingTop: 10, marginRight: 10 }}>
            <Button
              title="Let's go!"
              color="#F07323"
              onPress={() => {
                const action = { type: 'SET_WAYPOINTS', course: course, locations: locations };
                props.dispatch(action);
                props.navigation.navigate('TripNavigation');
              }}
            />
            <ButtonSwitch
              iconOn={require('../images/volume.png')}
              iconOff={require('../images/no-sound.png')}
              statue={props.profil.sound}
              onPressOff={() => {
                Tts.stop();
                const action = { type: 'SET_SOUND', value: !props.profil.sound };
                props.dispatch(action);
              }}
              onPressOn={() => {
                Tts.stop();
                const action = { type: 'SET_SOUND', value: !props.profil.sound };
                props.dispatch(action);
              }}

            />
          </View>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TripSuggestion);

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
    marginTop: 10,
    marginBottom: 10,
    width: '95%',
    borderRadius: 5,
    opacity: 0.9,
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.08,
    width: '100%',
  },
  newTrip: {
    alignItems: 'center',
    backgroundColor: '#F07323',
    paddingVertical: '5%',
    paddingHorizontal: '30%',
    borderRadius: 5,
  }
});
