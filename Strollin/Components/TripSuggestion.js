import React, { useState, useEffect } from 'react';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, ScrollView, Button , Image, PermissionsAndroid, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator, RefreshControl
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import I18n from '../Translation/configureTrans';
import Map from './map';

import CourseElementList from './CourseElementList';
import BackgroundImage from './backgroundImage';
import ButtonSwitch from './ButtonSwitch';
import TripElement from './TripElement';

import {getCustomCourse} from '../apiServer/course';
import {getLocationByID} from '../apiServer/locations';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import Modal from 'react-native-modal'
import {generateCourse} from '../apiServer/course';
import ModalContent from 'react-native-modal'
import Carousel from 'react-native-snap-carousel';

function randPic() {
  const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street2.jpg'));
  }
  return (require('../ressources/street1.jpg'));
}

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

let carouselItem = {
    activeIndex:0,
    carouselItems: [

  ]
}


async function registerCourse(access_token, setLoading) {

  const store = Store.getState();
  const bodyRequest = JSON.stringify({
    locations_list: store.course.course[0].locations_list,
    name: store.course.course[0].name
  });
  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/new_course`, {
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
      const action = {
        type: 'SET_CURRENT_COURSE',
        value: json.course
      };
      Store.dispatch(action);
    })
    .then(setLoading(false))
    .catch((error) => {
      console.error('error :', error);
      setLoading(false);
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

  const locationModal = {locations: []}
  let locationTmp = locationModal
  const [course, setCourse] = useState(null);
  const [locations, setLocations] = useState(null);
  const [testo, setTesto] = useState(false); //PLEASE DO NOT DELETE

  async function getLocations2() {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    const settings = {
      pos : store.CourseSettings.pos,
      budget : store.CourseSettings.budget,
      hours : store.CourseSettings.hours,
      minutes : store.CourseSettings.minutes,
      eat : store.CourseSettings.eat,
      radius : store.CourseSettings.radius,
      placeNbr : store.CourseSettings.placeNbr,
      tags : store.CourseSettings.tags,
      locations_list: store.course.currentLocationProposition,
      is18: store.CourseSettings.is18,
      tempTags: store.CourseSettings.tempTags,
      friendstags: store.CourseSettings.friendstags
    }
    const test = await generateCourse(access_Token, settings);
    const result = await getArrayLocation(props.profil.access_token, test.course.locations_list)
    setLocations(result);
    //setLocationsCarrousel(result)
    check_open(result)
  }

  function setLocationsCarrousel(locationsSet) {
    locationTmp = locationModal
    locationTmp.locations = locationsSet
    console.log("locationTmp: ", locationTmp);
    carouselItem.carouselItems.push(locationTmp)
    setCarrousel(carouselItem)
    setTesto(!testo) //PLEASE DO NOT DELETE
  }

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');

    async function getCourse() {
      const result = props.course.currentCourse;
      setCourse(result);
    }
    carouselItem.carouselItems = []

    async function getLocations() {
      const result = await getArrayLocation(props.profil.access_token, course.locations_list)
      setLocations(result);
      //setLocationsCarrousel(result)
      check_open(result)
    }

    /*function test() {
    if (locations != null) {
      check_open()
    }
  }*/


    //if (course) {
      getCourse();
    //}

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

  const [carouselItemFinal, setCarrousel] = useState(carouselItem)
  const  [deleteLocation, setDelLocations] = useState(null)
  let locations_tmp = []
  let locations_name = []
  const [isModalVisible, setModalVisible] = useState(false);
  const [getName, setName] = useState("")
  const [isLoading, setLoading] = useState(false);
  const [indexN, setIndex] = useState(0)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("C frais");
    getLocations2()
    setRefreshing(false);
  }, []);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  };

  function getNameFunction(result) {
    setDelLocations(locations_tmp)
    let name = ""
    locations_name.forEach((item) => {
      if (name != "") {
        name += ', ' + item
      } else {
      name = item
      }
    });

    let nametmp = "ces lieux sont actuelement fermés :\n" + name + "\nvoulez vous les suprimer ?"
    setName(nametmp)
    setLoading(false)
    if (name != "")
      toggleModal()
    else {
        setLocationsCarrousel(result)
    }

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
      const url = `http://${IP_SERVER}:${PORT_SERVER}/location/check_open`
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
            getNameFunction(result)
          }});
        })};

  function _renderItem2({item}){
    return (
      <View style={styles.view_box}>
        <ImageBackground
          style={styles.img_boxBack}
          imageStyle={styles.img_boxBack}
          source={randPic()}
        >
          <View style={styles.view_boxIn}>
            <View style={styles.view_information}>
              <Image style={styles.img_information} source={require('../images/icons/white/marker.png')} />
              <Text style={styles.text_information}>{item.address}, {item.city}</Text>
            </View>
            <Text style={styles.text_name}>{item.name}</Text>
            <View style={styles.view_share}>
              <TouchableOpacity
                onPress={() => {
                  Share.share({
                    message: `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${item.name} au ${item.address} !`,
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
                <Image style={styles.img_share} source={require('../images/icons/white/share.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const shareLinkContent = {
                    contentType: 'link',
                    contentUrl: 'https://www.google.com',
                    quote: `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${item.name} au ${item.address} !`,
                  };
                  ShareDialog.show(shareLinkContent);
                }}
                accessibilityLabel="Share"
              >
                <Image style={styles.img_share} source={require('../images/icons/white/facebook.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
  )}

  function _renderItem({item,index}){
  return (
    <View>
    <FlatList
      //style={styles.view_list}
      keyExtractor={item => item.id}
      data={item.locations}
      renderItem={_renderItem2}
    />
    </View>
  )
}

function testrenderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 50,
              marginLeft: 25,
              marginRight: 25, }}>
            <Text style={{fontSize: 30}}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>

        )
    }

  // récupére le trajet précédent et pasre les nom et envoie les dans mle header
  async function regenerate_course() {
    const access_token = props.profil.access_token;
    const settings = {
      ...props.CourseSettings,
      locations_list : props.course.currentLocationProposition
    }

    const result = await generateCourse(access_token, settings);

    setLoading(false);

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

  let test = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
          {
              title:"Item 4",
              text: "Text 4",
          },
          {
              title:"Item 5",
              text: "Text 5",
          },
        ]
      }

  return (
    <ScrollView
      style={styles.view_back}
      refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
      }
    >
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
      <View style={styles.view_carrousel}>
      {/*<View style={styles.view_carrousel}>
        <ElementHistoryNav course={course} locations={locations}/>*/}
          <Carousel
            layout={"default"}
            //ref={ref => this.carousel = ref}
            data={carouselItemFinal.carouselItems}
            //containerCustomStyle={styles.carouselContainer}
            sliderWidth={350}
            itemWidth={350}
            itemHeight={100}
            useScrollView={true}
            keyExtractor={(item) => item.id}
            renderItem={_renderItem}
            onSnapToItem = { index => {
              carouselItemFinal.activeIndex = index
            }} />
      </View>
      <View>
        <Modal isVisible={isModalVisible}>
          <View>
            <Button title={getName} color="#BB7859"/>
            <Button title="Oui, suprimez les" onPress={() => {
              setLocations(deleteLocation)
              setLocationsCarrousel(deleteLocation)
              toggleModal()
            }} />
            <Button title="Non, gardez les" onPress={() => {
              setLocationsCarrousel(locations)
              toggleModal()
            }} />
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          let finalLocations = carouselItemFinal.carouselItems[carouselItemFinal.activeIndex].locations
          var loctmp = [];

          for (var i = 0; i < finalLocations.length; i++) {
            loctmp.push(finalLocations[i].id)
          }
          course.locations_list = loctmp;
          const action = { type: 'SET_WAYPOINTS', course: course, locations: finalLocations };
          props.dispatch(action);
          //registerCourse(props.profil.access_token);
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
          setLoading(true);
          getLocations2()
        }}
      >
        <Text style={styles.text_button}>New Trip</Text>
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={isLoading}
      >
        <View style={styles.loading_screen}>
          <ActivityIndicator size="large"  color="black" style={{}}/>
        </View>
      </Modal>
    </ScrollView>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TripSuggestion);

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
    flex:1,
    marginBottom: 20,
    flexDirection: 'row',
  },
  view_header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  view_carrousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  view_button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 45,
    marginBottom: 5.5,
    backgroundColor: '#0092A7',
    flexDirection: 'row',
    marginTop: 10
  },
  text_button: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loading_screen: {
    backgroundColor:'rgba(100,100,100,0.75)',
    display: "flex",
    justifyContent: 'space-around',
    height: '100%'
  },
  view_back: {
    flex: 1,
    maxHeight: '100%',
    flexDirection: 'column',
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '0%',
    paddingRight: '0%',
    paddingBottom: '1.8%',
  },
  viex_list: {
    height: '61.8%',
  },
  view_box: {
    backgroundColor: '#000000',
    borderRadius: 12,
    width: 330,
    height: 179,
    marginBottom: 12.5,
  },
  img_boxBack: {
    flex: 1,
    borderRadius: 12,
  },
  view_boxIn: {
    flex: 1,
    flexDirection: 'column-reverse',
    borderRadius: 12,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 5,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  view_information: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  img_information: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text_information: {
    textTransform: 'capitalize',
    color: '#FFFFFF',
    fontSize: 12,
    paddingRight: 50,
  },
  img_buget: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_budget: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  text_name: {
    textTransform: 'capitalize',
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2.5,
    paddingRight: 20,
  },
  view_share: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  img_share: {
    width: 25,
    height: 25,
    marginRight: 10,
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
