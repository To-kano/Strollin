import React, { useState, useEffect } from 'react';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button , Image, PermissionsAndroid, TouchableOpacity,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import I18n from '../Translation/configureTrans';
import Map from './map';

import ElementHistoryNav from './HistoryElement';
import BackgroundImage from './backgroundImage';
import ButtonSwitch from './ButtonSwitch';

import {getCustomCourse} from '../apiServer/course';
import {getLocationByID} from '../apiServer/locations';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import Modal from 'react-native-modal'
import {generateCourse} from '../apiServer/course';
import ModalContent from 'react-native-modal'

function getNavigation({route}) {

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


async function registerCourse(access_token) {
//console.log("trying to register course....");

  const store = Store.getState();
  const bodyRequest = JSON.stringify({
    locations_list: store.course.course[0].locations_list,
    name: store.course.course[0].name
  });
  await fetch(`https://${IP_SERVER}:${PORT_SERVER}/course/new_course`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access_token': access_token,
    },
    method: 'post',
    body: bodyRequest,
    })
    .then(res => res.json())
    .then(json => {
    //console.log("course registered = ", json.course);
      const action = {
        type: 'SET_CURRENT_COURSE',
        value: json.course
      };
      Store.dispatch(action);
    }).catch((error) => {
      console.error('error :', error);
    });
}

async function getArrayLocation(access_token, idLocations) {
  let result = [];
  for (let i = 0; i < idLocations.length; i++) {
    result.push(await getLocationByID(access_token, idLocations[i]));
  }
  return result
}



export function TripSuggestion(props) {
  const [course, setCourse] = useState(null);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');

    async function getCourse() {
      const result = props.course.currentCourse;
      setCourse(result);
    }

    async function getLocations() {
      const result = await getArrayLocation(props.profil.access_token, course.locations_list)
      setLocations(result);
      check_open(result)
    }

    /*function test() {
    if (locations != null) {
      check_open()
    }
  }*/


    if (!course) {
      getCourse();
    }

    if (props.profil.sound && course) {
      for (let i = 0; i < course.length; i++) {
        Tts.speak(`${I18n.t("TripSuggestion.step")} ${i + 1}`);
        Tts.speak(course.name);
      }
    }
    if (course && course.locations_list) {
      getLocations();
    }
  }, [props.course.currentCourse, course]);


  const  [deleteLocation, setDelLocations] = useState(null)
  let locations_tmp = []
  let locations_name = []
  const [isModalVisible, setModalVisible] = useState(false);
  const [getName, setName] = useState("")
  const [loading, setLoading] = useState(true)

  function toggleModal() {
    setModalVisible(!isModalVisible);
  };

  function getNameFunction() {
    let name = ""
    locations_name.forEach((item) => {
    //console.log("\n\ndeleted: ", item )
      if (name != "") {
        name += ', ' + item
      } else {
      name = item
      }
    });
    let nametmp = "ces lieux sont actuelement fermés :\n" + name + "\nvoulez vous les suprimer ?"
    setName(nametmp)
  //console.log("\n\ndeleted: ", nametmp )
    toggleModal()
    setDelLocations(locations_tmp)
    /*if (confirm("Do you want to save changes?") == true) {
      setLocations(locations_tmp)
    }*/
  }

  const deltaView = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function check_open(result) {
    locations_tmp = []
    result.forEach((item, i) => {
      const url = `https://${IP_SERVER}:${PORT_SERVER}/location/check_open`
      fetch(url, {
        headers: {
          name: item.name
        },
        method: 'GET',
      })
        .then((response) => response.json())
        .then((answer) => {
          if (!answer.result.candidates[0].opening_hours || answer.result.candidates[0].opening_hours.open_now == true) {
            locations_tmp.push(item)
          } else {
            locations_name.push(item.name)
          }
        })
        .catch((error) => {
          console.error('error :', error);
        })
        .finally(() => {
          if (i == result.length - 1) {
          //console.log(locations_tmp)
            getNameFunction()
          }});
        })};



  // récupére le trajet précédent et pasre les nom et envoie les dans mle header
  async function regenerate_course() {
    const access_token = props.profil.access_token;
    const settings = {
      ...props.CourseSettings,
      locations_list : props.course.currentLocationProposition
    }

    const result = await generateCourse(access_token, settings);

  console.log("result generate course", result.course);

      let action = {
        type: 'SET_CURRENT_COURSE',
        value: result.course
      };
      Store.dispatch(action);
      action = {
        type: 'ADD_LOCATION_PROPOSITION',
        value: result.course.locations_list
      };
      Store.dispatch(action);
  }

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')}/>
        </TouchableOpacity>
        <Text style={styles.text_header}>New Trip</Text>
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
      <View style={styles.viex_list}>
        <ElementHistoryNav course={course} locations={locations}/>
      </View>
      <View>
        <Modal isVisible={isModalVisible}>
          <View>
            <Button title={getName} color="#BB7859"/>
            <Button title="Oui, suprimez les" onPress={() => {
            //console.log(deleteLocation)
              setLocations(deleteLocation)
              toggleModal()
            }} />
            <Button title="Non, gardez les" onPress={() => {
              toggleModal()
            }} />
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          const action = { type: 'SET_WAYPOINTS', course: course, locations: locations };
          props.dispatch(action);
          registerCourse(props.profil.access_token);
          props.navigation.navigate('TripNavigation');
          // const action = { type: 'SET_WAYPOINTS', course: course, locations: locations };
          // props.dispatch(action);
          // props.navigation.navigate('TripNavigation');
          // const action = { type: 'SET_WAYPOINTS', value: waypoints };
          // props.dispatch(action);
          // props.navigation.navigate('TripNavigation');
        }}
      >
        <Text style={styles.text_button}>Lets Go !</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          regenerate_course()
        }}
      >
        <Text style={styles.text_button}>New Trip</Text>
      </TouchableOpacity>
    </View>
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
    width: '77.8%',
    // width: '87.6%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  viex_list: {
    flex: 712,
    width: '100%',
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
