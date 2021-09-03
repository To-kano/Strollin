import React, { useState, useEffect } from 'react';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button , Image, PermissionsAndroid, TouchableOpacity, FlatList, ImageBackground
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import I18n from '../Translation/configureTrans';
import Map from './map';

import ElementHistoryNav from './HistoryElement';
import BackgroundImage from './backgroundImage';
import ButtonSwitch from './ButtonSwitch';
import TripElement from './TripElement';

import {getCustomCourse} from '../apiServer/course';
import {getLocationByID} from '../apiServer/locations';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import Modal from 'react-native-modal'
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


async function registerCourse(access_token) {
  console.log("trying to register course....");

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
      console.log("course registered = ", json.course);
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

  const locationModal = {locations: []}
  let locationTmp = locationModal

  async function getLocations2() {
    const result = await getArrayLocation(props.profil.access_token, course.locations_list)
    setLocations(result);
    //setLocationsCarrousel(result)
    check_open(result)
  }

  function setLocationsCarrousel(locationsSet) {
    locationTmp = locationModal
    locationTmp.locations = locationsSet
    carouselItem.carouselItems.push(locationTmp)
    console.log("\n\n coucou \n\n",locationTmp," \n\n\n\n")
    setCarrousel(carouselItem)
  }
  const [course, setCourse] = useState(null);

  //const { test } = route.params;
  //console.log("\n\n\nprops: ", props.profil);

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');

    async function getCourse() {
      //const result = await getCustomCourse(props.profil.access_token);
      const store = Store.getState();
      const result = store.course.course[0];
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
  }, [course]);

  const [carouselItemFinal, setCarrousel] = useState(carouselItem)
  const [locations, setLocations] = useState(null);
  const  [deleteLocation, setDelLocations] = useState(null)
  let locations_tmp = []
  let locations_name = []
  const [isModalVisible, setModalVisible] = useState(false);
  const [getName, setName] = useState("")
  const [loading, setLoading] = useState(true)
  const [indexN, setIndex] = useState(0)

  function toggleModal() {
    setModalVisible(!isModalVisible);
  };

  function getNameFunction() {
    setDelLocations(locations_tmp)
    let name = ""
    locations_name.forEach((item) => {
      console.log("\n\ndeleted: ", item )
      if (name != "") {
        name += ', ' + item
      } else {
      name = item
      }
    });

    let nametmp = "ces lieux sont actuelement fermés :\n" + name + "\nvoulez vous les suprimer ?"
    setName(nametmp)
    console.log("\n\ndeleted: ", nametmp )
    if (name != "")
      toggleModal()
    else {
        setLocationsCarrousel(locations)
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
            getNameFunction()
          }});
        })};

  //console.log("stp bb: ", props.CourseSettings.pos);
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
      keyExtractor={item => item.name}
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
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    let time = Number(props.CourseSettings.hours) *  60 + Number(props.CourseSettings.minutes);
    const coordinate = [];

    console.log("previous course: ", store.course.course[0].locations_list);
    coordinate[0] = props.CourseSettings.pos.latitude;
    coordinate[1] = props.CourseSettings.pos.longitude;

    console.log("time: ", time);
    console.log("coordo: ", coordinate);
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/generator/generate_course`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_Token,
      'time': time,
      'budget': props.CourseSettings.budget,
      'tags': props.CourseSettings.tags,
      'coordinate' : coordinate,
      'eat' : props.CourseSettings.isEatDrink,
      'radius' : props.CourseSettings.radius,
      'placenbr' : props.CourseSettings.placeNbr,
      'locations_list': store.course.course[0].locations_list
    },
    method: 'GET',
    })
    .then(res => res.json())
    .then(json => {
      console.log("algo done:   ", json);
      setCourse(json.course);
      //PopUpReq(pos, json.generated_course);
      const action = {
        type: 'ADD_COURSE',
        value: json.course
      };
      Store.dispatch(action);
      props.profil.scoreCourse = json.generated_course
      props.profil.first_name = props.CourseSettings.pos
      props.navigation.navigate("TripSuggestion");
    }).catch((error) => {
      console.error('error :', error);
    });
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
            renderItem={_renderItem}
            onSnapToItem = { index => {
              carouselItem.activeIndex = index
              console.log(carouselItem.activeIndex)
            }} />
      </View>
      <View>
        <Modal isVisible={isModalVisible}>
          <View>
            <Button title={getName} color="#BB7859"/>
            <Button title="Oui, suprimez les" onPress={() => {
              console.log(deleteLocation)
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
          let finalLocations = carouselItem.carouselItems[carouselItem.activeIndex].locations
          const action = { type: 'SET_WAYPOINTS', course: course, locations: finalLocations };
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
          getLocations2()
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
  view_back: {
    flex: 1,
    maxHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
