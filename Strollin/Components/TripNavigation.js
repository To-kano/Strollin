import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet, AppState, View, Text, Button, BackHandler, Image, TouchableOpacity, Dimensions, ActivityIndicator, Modal, RefreshControl, Share
} from 'react-native';

import { connect } from 'react-redux';

//import AndroidPip from 'react-native-android-pip';
import I18n from '../Translation/configureTrans';
import Map from './map';
import { addUserHistoric } from '../apiServer/user';
import Store from '../Store/configureStore';
import { PopUpForm } from './PopUpForm';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import {createNewCourse} from '../apiServer/course';
import MenuButton from './components/MenuButton';
import CloseButton from './components/CloseButton';
import { FlatList } from 'react-native-gesture-handler';
import { translateTags } from '../Translation/translateTags';
import Icon from './components/Icon';
import { ShareDialog } from 'react-native-fbsdk';
import Popup from './Popup';

const globalStyles = require('../Styles');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function randPic() {
  /*const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street1.jpg'));
  }*/
  return (require('../ressources/street2.jpg'));
}

export function TripNavigation({ map, profil, dispatch, navigation}) {
  const [displayMap, setDisplayMap] = useState(true);
  const [pop, setPop] = useState(false);
  const [del, setDel] = useState(false);
  const [course, setCourse] = useState(null);
  const [place, setPlace] = useState(null);
  const [isMoving, setIsMoving] = useState(Store.getState().CourseSettings.isMoving);
  const [isLoading, setLoading] = React.useState(false);

  function compare(a, b) {
    if (a.Dist > b.Dist) return 1;
    if (b.Dist > a.Dist) return -1;
  }

  async function DeletePlace(isDelete) {
    if (!isDelete) {
      setDel(false)
      return
    }
    const store = Store.getState();
    var current = store.course.currentCourse
    var list = current.locations_list;
    for (var i = 0; i < list.length; i++) {
      if (list[i] === store.course.delete[0]) {
        locations.splice(i, 1);
        current.locations_list.splice(i, 1);
      }
    }
    //locations.splice(3, 1);
    var action = { type: 'SET_CURRENT_COURSE', value: current };
    Store.dispatch(action);
    var action = { type: 'SET_LOCATIONS', locations: locations };
    Store.dispatch(action);
    setDel(false)
  }

  async function PopUpResponse(response, pos, course, popup) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    const coordinate = [];
    const test = JSON.stringify({course: course, popup: popup})
    coordinate[0] = pos.latitude;
    coordinate[1] = pos.longitude;

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
      setPop(false);
    })
    .then(setLoading(false));

    if (response == false)
      return
    //update course
    setLoading(true);
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
      let test_loc = locations
      test_loc.push(json.locations_list[0])
      test_loc.sort(compare)
      const action = { type: 'SET_LOCATIONS', locations: test_loc };
      Store.dispatch(action);
      setDisplayMap(false);
      setDisplayMap(true);
    })
    .then(setLoading(false));
  }

  async function PopUpReq(pos, course) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
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
      setCourse(json.popup)
      //console.log("stp c la le truc: ", json.popup);
      setPop(true);
      // console.log("stp c la le truc: ", json.popup);
    })
    .then(setLoading(false));
  }


  useEffect(() => {
    setTime();
  }, []);

  async function setTime() {
    let tmp = await Date.now();
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

if (del) {
  return (
    <View>
      <Text>
        Are you sure you want to delete this place ?: {Store.getState().course.delete[1]}
      </Text>
      <Button
        title="yes"
        onPress={() => DeletePlace(true)}
      />
      <Button
        title="no"
        onPress={() => DeletePlace(false)}
      />
    </View>
  )
}
 // if (pop) {
 //   return (
 //     <View style={styles.view_popup}>
 //       <Text style={[styles.text_popup, styles.text_question]}>
 //         Do you want to go to : {course.Name}
 //       </Text>
 //       <View style={styles.view_button}>
 //         <TouchableOpacity
 //           style={styles.button_no}
 //           onPress={() => PopUpResponse(false, profil.first_name, profil.scoreCourse, course)}
 //         >
 //           <Text style={styles.text_popup}>No</Text>
 //         </TouchableOpacity>
 //         <TouchableOpacity
 //           style={styles.button_yes}
 //           onPress={() => PopUpResponse(true, profil.first_name, profil.scoreCourse, course)}
 //         >
 //           <Text style={styles.text_popup}>Yes</Text>
 //         </TouchableOpacity>
 //       </View>
 //     </View>
 //   )}
 // else {
   console.log("loc : ", locations[0]);
  return (
    <View style={globalStyles.container}>
      <View style={styles.view_map}>
        {displayMap &&
          <Map
            navigation={navigation}
            height={windowHeight}
            width={windowWidth}
            deltaView={deltaView}
            locations={locations}
            isMoving={isMoving}
          />
        }
      </View>
      {/* <View style={styles.view_header}>
        <Text style={styles.text_header}>   My Trip</Text>
        <TouchableOpacity
          onPress={async () => {
            const store = Store.getState();
            const result = await createNewCourse(store.profil.access_token, store.course.currentCourse);
            addUserHistoric(store.profil.access_token, result.id);
            const action = { type: 'ADD_HISTORY', courseID: result.id };
            dispatch(action);
            const action2 = { type: 'ADD_COURSE_OBJECT_HISTORIC', value: result };
            dispatch(action2);
            navigation.navigate('CourseEvaluation');
          }}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/close.png')} />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          right: 8,
          left: 8,
          backgroundColor: "#ffffff",
          padding: 16,
          margin: 16,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
        }}>
          <Text style={globalStyles.subtitles}>{locations[0].name}</Text>
          <Text numberOfLines={1} style={[globalStyles.subparagraphs, {color: '#9B979B'}]}>{locations[0].address}, {locations[0].city}</Text>
          <View style={{ marginTop: 16, width: "100%", }}>
            <FlatList
              style={{ width: "100%" }}
              data={locations[0].tags_list}
              horizontal={true}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <>
                {translateTags(item._id) === 'error'
                ? <></>
                : <Text style={[globalStyles.subparagraphs, globalStyles.tag,]}>{translateTags(item._id) === 'error' ? <></> : translateTags(item._id)}</Text>
                }
              </>
              )}
            />
          </View>
          <View style={{ position: 'absolute', top: 8, right: 8, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  message: `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${locations[0].name} au ${locations[0].address} !`,
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
              accessibilityLabel="Share"
            >
              <Icon name="share" size={29} color='#000000'/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 8}}
              onPress={() => {
                const shareLinkContent = {
                  contentType: 'link',
                  contentUrl: 'https://www.google.com',
                  quote: `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${locations[0].name} au ${locations[0].address} !`,
                };
                ShareDialog.show(shareLinkContent);
              }}
              accessibilityLabel="Share"
            >
              <Icon name="facebook" size={29} color='#000000'/>
            </TouchableOpacity>
          </View>
      </View>
      <CloseButton
        style={{right : undefined, left: 16}}
        onPressFct={async () => {
          const store = Store.getState();
          const result = await createNewCourse(store.profil.access_token, store.course.currentCourse);
          addUserHistoric(store.profil.access_token, result.id);
          var action = { type: 'ADD_HISTORY', courseID: result.id };
          dispatch(action);
          const action2 = { type: 'ADD_COURSE_OBJECT_HISTORIC', value: result };
          dispatch(action2);
          action = {
            type: 'ADD_POS',
            value: 0
          };
          Store.dispatch(action);
          action = {
            type: 'ADD_IS_MOVING',
            value: true
          };
          action = {
            type: 'ADD_FRIENDSTAGS',
            value: []
          };
          Store.dispatch(action);
          action = {
            type: 'ADD_TEMPORARYTAGS',
            value: []
          };
          Store.dispatch(action);
          Store.dispatch(action);
          navigation.navigate('CourseEvaluation');
        }}
      />
      <TouchableOpacity
        style={{}}
        onPress={() => {
          setDel(true)
        }}
      >
        <Text style={styles.text_signIn}>{I18n.t("TripNavigation.delete")}</Text>
      </TouchableOpacity>

      {pop &&
        <View style={styles.view_popup}>
          <Text style={[styles.text_popup, styles.text_question]}>
            Do you want to go to : {course.Name}
          </Text>
          <View style={styles.view_button}>
            <TouchableOpacity
              style={styles.button_no}
              onPress={() => PopUpResponse(false, profil.first_name, profil.scoreCourse, course)}
            >
              <Text style={styles.text_popup}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button_yes}
              onPress={() => PopUpResponse(true, profil.first_name, profil.scoreCourse, course)}
            >
              <Text style={styles.text_popup}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      }

      {/* <TouchableOpacity onPress={() => {
        const store = Store.getState();
        setLoading(true);
        //DeletePlace();
        PopUpReq(profil.first_name, profil.scoreCourse); //Je sais pas utiliser les props du coup g stocker des truc dans les props dans course settings
      }}>
        <Text style={styles.text_signIn}>Simulate</Text>
      </TouchableOpacity> */}

      <Modal
        animationType="none"
        transparent={true}
        visible={isLoading}
      >
        <View style={styles.loading_screen}>
          <ActivityIndicator size="large"  color="black" style={{}}/>
        </View>
      </Modal>
    </View>
  );
//   }
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
  view_popup: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    flexDirection: 'column',
    width: '100%',
    height: '14%',
    elevation: 5,
    backgroundColor: '#FFF'
  },
  img_boxBack: {
    flex: 1,
    borderRadius: 12,
  },
  view_button: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button_no: {
    backgroundColor: '#FFFFFF00',
    width: "45%",
    borderRadius: 10,
    paddingVertical: 8,
  },
  button_yes: {
    backgroundColor: '#FAC402',
    width: "45%",
    borderRadius: 10,
    paddingVertical: 8,
  },
  text_popup: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text_question: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
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
  loading_screen: {
    backgroundColor:'rgba(100,100,100,0.75)',
    display: "flex",
    justifyContent: 'space-around',
    height: '100%'
  },
});
