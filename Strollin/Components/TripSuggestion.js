import React, { useState, useEffect } from 'react';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button , Image, Dimensions, PermissionsAndroid, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator, ScrollView, RefreshControl, Share
} from 'react-native';
import I18n from '../Translation/configureTrans';
import { ShareDialog } from 'react-native-fbsdk';


import ButtonSwitch from './ButtonSwitch';
import { translateTags, detranslateTags } from '../Translation/translateTags'

import {getCustomCourse} from '../apiServer/course';
import {getLocationByID} from '../apiServer/locations';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import Modal from 'react-native-modal';
import {checkLocationIsOpen} from '../apiServer/locations';
import {generateCourse} from '../apiServer/course';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MenuButton from './components/MenuButton';
import Footer from './components/Footer';
import Popup from './Popup';
import Icon from './components/Icon';

import { useNavigation } from '@react-navigation/native';


const globalStyles = require('../Styles');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

async function getArrayLocation(access_token, idLocations) {
  let result = [];
  for (let i = 0; i < idLocations.length; i++) {
    result.push(await getLocationByID(access_token, idLocations[i]));
  }
  return result
}

export function TripSuggestion(props) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [carousel, setCarrousel] = useState([]);
  const [filteredOpenLocation, setFilteredOpenLocation] = useState([]);
  const [closedLocationsName, setClosedLocationsName] = useState([]);

  console.log("access token ", props.profil.access_token)


  useEffect(() => {
    //Tts.setDefaultLanguage('en-US');

    //async function getCourse() {
    //  const result = props.course.currentCourse;
    //  //setCourse(result);
    //}
    //carouselItem.carouselItems = []

    async function getLocations() {
      const result = await getArrayLocation(props.profil.access_token, props.course.currentCourse.locations_list)
      setCarrousel((arrayCourse) => {
        arrayCourse.push(result);
        return arrayCourse;
      })
      //setLocations(result);
      //setLocationsCarrousel(result)
      //check_open(result)
    }


    //if (course) {
      //getCourse();
    //}

    //if (props.profil.sound && course) {
    //  for (let i = 0; i < course.length; i++) {
    //    Tts.speak(`${I18n.t("TripSuggestion.step")} ${i + 1}`);
    //    Tts.speak(course.name);
    //  }
    //}
    if (props.course.currentCourse && props.course.currentCourse.locations_list) {
      getLocations();
    }
  }, [props.course.currentCourse]);

  useEffect(() => {

    async function checkOpen(locations) {
      let locationsOpen = [];
      let locationsName = [];
    
      const body_request = JSON.stringify({list: locations})
    
        let result = await checkLocationIsOpen(body_request)
        console.log("answer: ", result[0]);
        for (var i = 0; i < result.length; i++) {
          if (result[i].website == true) {
            locationsOpen.push(result[i])
          } else {
            locationsName.push(result[i].name)
          }
        }
        setFilteredOpenLocation(locationsOpen);
        setClosedLocationsName(locationsName);
        //getNameFunction(answer.res)
    }; 

    if (carousel.length > 0) {
      checkOpen(carousel[carousel.length - 1])
    }
  }, [carousel])

  useEffect(() => {
    console.log("closec location", closedLocationsName);
    if (closedLocationsName.length > 0) {
      setModalVisible(true);
    }
  }, [closedLocationsName])

  return (
    <>
      <Popup message={"Ces lieux sont fermés.."} modalVisible={isModalVisible} setModalVisible={setModalVisible}>
        <FlatList
          style={{height : 200}}
          data={closedLocationsName}
          renderItem={({item}) => {
            return <Text style={[globalStyles.paragraphs, {width: '100%'}]}>- {item}</Text>
          }}
          keyExtractor={(item) => item}
        />
        <Text style={[globalStyles.paragraphs, {marginTop: 32, width: '100%'}]}>Est-ce tu veux qu on les enlève du trajet que tu vas faire ?</Text>
        <View style={{
            width: '100%',
            marginTop: 32,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <TouchableOpacity
              style={{ backgroundColor: "#ffffff", padding: 16, alignItems: 'center', borderRadius: 32 }}
              onPress={() => {
                setModalVisible(false);
                setFilteredOpenLocation([]);
                setClosedLocationsName([]);
              }}
            >
              <Text style={globalStyles.paragraphs}>Non merci</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "#0989FF", padding: 16, alignItems: 'center', borderRadius: 32 }}
              onPress={() => {
                setModalVisible(false);
                setCarrousel((value) => { 
                  value[value.length - 1] = filteredOpenLocation;

                  setFilteredOpenLocation([]);
                  setClosedLocationsName([]);

                  return value;
                })
              }}
            >
              <Text style={[globalStyles.paragraphs, { color: '#ffffff' }]}>Oui svp</Text>
            </TouchableOpacity>
          </View>
      </Popup>
      <MenuButton props={props}/>
      <ButtonSwitch
        iconOn={"sound_active"}
        iconOff={"sound_inactive"}
        position={{top: 16, right: 16}}
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
      <View style={[globalStyles.container, {paddingHorizontal: 0}]}>
      </View>
      <Footer
        primaryText={I18n.t("TripSuggestion.letsGo")}
        primaryOnPressFct={() => {
          let finalLocations = carouselItemFinal.carouselItems[carouselItemFinal.activeIndex].locations
          var loctmp = [];

          for (var i = 0; i < finalLocations.length; i++) {
            loctmp.push(finalLocations[i].id)
          }
          course.locations_list = loctmp;
          var action = { type: 'SET_WAYPOINTS', course: course, locations: finalLocations };
          props.dispatch(action);
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
          //registerCourse(props.profil.access_token);
          props.navigation.navigate('TripNavigation');
          // const action = { type: 'SET_WAYPOINTS', course: course, locations: locations };
          // props.dispatch(action);
          // props.navigation.navigate('TripNavigation');
          // const action = { type: 'SET_WAYPOINTS', value: waypoints };
          // props.dispatch(action);
          // props.navigation.navigate('TripNavigation');
        }}
        secondaryText={I18n.t("TripSuggestion.newTrip")}
        secondaryOnPressFct={() => {
          setLoading(true);
          getLocations2()
        }}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={isLoading}
      >
        <View style={styles.loading_screen}>
          <ActivityIndicator size="large"  color="black" style={{}}/>
        </View>
      </Modal>
    </>
  )

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
});
