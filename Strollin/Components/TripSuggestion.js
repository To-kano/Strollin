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

async function generateNewTrip(setCarrousel, setGeneredTrip, acc) {
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
  const newTrip = await generateCourse(access_Token, settings);
  setGeneredTrip((ArrayTrip) => {
    const newArraytrip = [...ArrayTrip, newTrip.course];
    return newArraytrip;
  })
  const result = await getArrayLocation(access_Token, newTrip.course.locations_list);
  setCarrousel((arrayCourse) => {
    const newArrayCourse = [...arrayCourse, result];
    return newArrayCourse;
  })
  //setLocations(result);
  //setLocationsCarrousel(result)
  //check_open(result)
}

export function TripSuggestion(props) {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [generetedTrip, setGeneredTrip] = useState([]);
  const [carousel, setCarrousel] = useState([]);
  const [indexCarrousel, setindexCarrousel] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    console.log("index ", indexCarrousel);
  }, [indexCarrousel])

  const [filteredOpenLocation, setFilteredOpenLocation] = useState([]);
  const [closedLocationsName, setClosedLocationsName] = useState([]);

  //console.log("render ", carousel);

  async function getCourse() {
    const result = props.course.currentCourse;
    setCourse(result);
  }

  useEffect(() => {
    getCourse()
    console.log("closec location", closedLocationsName);
    if (closedLocationsName.length > 0) {
      setModalVisible(true);
    }
  }, [closedLocationsName])

  
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
  }, [carousel.length])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("C frais");
    generateNewTrip(setCarrousel, setGeneredTrip);
    setRefreshing(false);
  }, []);

  async function removeFav() {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    const body = JSON.stringify({course_id: store.profil.favid})
    console.log("body: ", body);
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/remove_favorite`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access_token': access_Token,
      },
      method: 'post',
      body: body,
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch((error) => {
        console.error('error :', error);
      });
  }

  async function pushFav(courseID) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    console.log("courseID: ", courseID);
    const body = JSON.stringify({course: courseID})
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_favorite`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access_token': access_Token,
      },
      method: 'post',
      body: body,
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch((error) => {
        console.error('error :', error);
      });
  }

  async function addFav(coursetmp) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    const body = JSON.stringify({locations_list: coursetmp.locations_list, name: coursetmp.name})
    console.log("body: ", body);
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/new_course`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access_token': access_Token,
      },
      method: 'post',
      body: body,
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        let action = { type: 'SET_FAV_ID', value: json.course.id};
        props.dispatch(action);
        pushFav(json.course.id)
      })
      .catch((error) => {
        console.error('error :', error);
      });
  }

  useEffect(() => {

     const getLocations = async () => {
      const result = await getArrayLocation(props.profil.access_token, props.course.currentCourse.locations_list)
      setCarrousel((arrayCourse) => {
        const newArrayCourse = [...arrayCourse, result];
        return newArrayCourse;
      })
      setGeneredTrip((ArrayTrip) => {
        const newArraytrip = [...ArrayTrip, props.course.currentCourse];
        return newArraytrip;
      })
    }
    if (props.course.currentCourse && props.course.currentCourse.locations_list) {
      getLocations();
    }
  }, [props.course.currentCourse]);

  const LocationItem = ({item}) => {
    const navigation = useNavigation();

    return (
      <View style={{
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
        <TouchableOpacity
          onPress={() => {navigation.navigate('LocationPage', {location: item})}}
        >
          <Text style={globalStyles.subtitles}>{item.name}</Text>
          <Text numberOfLines={1} style={[globalStyles.subparagraphs, {color: '#9B979B'}]}>{item.address}, {item.city}</Text>
          <View style={{ marginTop: 16, width: "100%", }}>
            <FlatList
              style={{ width: "100%", flexWrap: 'wrap', flexDirection: 'row',  }}
              data={item.tags_list}
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
        </TouchableOpacity>
        <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{flexDirection: 'row'}}>
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
              <Icon name="share" size={29} color='#000000'/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 8}}
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
              <Icon name="facebook" size={29} color='#000000'/>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => { //#endregion
              console.log('Supprimer ', indexCarrousel, carousel[indexCarrousel])
              setCarrousel((arrayTripLocation) => {
                const result = arrayTripLocation[indexCarrousel].filter((location) => {
                  return location.id !== item.id;
                })

                console.log('result lol', result, arrayTripLocation[indexCarrousel]);

                const newValue = [...arrayTripLocation];

                newValue[indexCarrousel] = result;

                return newValue;



              })
            }}>
              <Icon name="bin" size={29} color='#FF0000'/>
            </TouchableOpacity>
          </View>

        </View>
      </View>
  )}

  const _renderItem = ({item}) => {
    return (
      <FlatList
        data={item}
        style={{ backgroundColor: '#ffffff'}}
        contentContainerStyle={{paddingTop: 96, paddingBottom: 176}}
        ListHeaderComponent={() => {
          return (<Text style={[globalStyles.subtitles, {marginHorizontal: 16}]}>On a trouvé ça pour toi</Text>)
        }}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <LocationItem item={item} />
        }}
      />
    )
  }
  

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
      <Pagination
        dotsLength={carousel.length}
        activeDotIndex={indexCarrousel}
        containerStyle={{ backgroundColor: '#ffffff00', position: 'absolute', top: 56, right: 0, left: 0, zIndex : 1 }}
        dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 4,
            backgroundColor: '#0989FF',
        }}
        inactiveDotStyle={{
            backgroundColor: '#9B979B',
            // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <ScrollView
        style={{width: "100%"}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
        }
      >
        <View style={[globalStyles.container, {paddingHorizontal: 0}]}>
          <Carousel
              layout={"stack"}
              //ref={ref => this.carousel = ref}
              data={carousel}
              //containerCustomStyle={styles.carouselContainer}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
              // itemHeight={100}
              //useScrollView={true}
              keyExtractor={(item) => item.id}
              renderItem={_renderItem}
              onSnapToItem={index => {
                //carouselItemFinal.activeIndex = index;
                setindexCarrousel(index);
              }}
            />
        </View>
      </ScrollView>
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
      <ButtonSwitch
        iconOff={'star_filled'}
        iconOn={'star_empty'}
        position={{top: 16, right: 90}}
        statue={props.profil.fav}
        onPressOff={() => {
          const action = { type: 'SET_FAV', value: !props.profil.fav };
          props.dispatch(action);
          console.log("course: ", course);
          addFav(course);
        }}
        onPressOn={() => {
          const action = { type: 'SET_FAV', value: !props.profil.fav };
          props.dispatch(action);
          console.log("IT iS ONS");
          console.log("course: ", course);
          removeFav();
        }}
      />
      <Footer
        primaryText={I18n.t("TripSuggestion.letsGo")}
        primaryOnPressFct={() => {
          let selectedTrip = generetedTrip[indexCarrousel];
          let selectedLocations = carousel[indexCarrousel];
          var loctmp = [];

          for (var i = 0; i < selectedLocations.length; i++) {
            loctmp.push(selectedLocations[i].id)
          }
          selectedTrip.locations_list = loctmp;
          var action = { type: 'SET_WAYPOINTS', course: selectedTrip, locations: selectedLocations };
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
          //setLoading(true);
          if (carousel.length < 5) {
            generateNewTrip(setCarrousel, setGeneredTrip);
          }
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
