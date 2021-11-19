import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, TextInput, ActivityIndicator, Modal
} from 'react-native';
import Stars from 'react-native-stars';
import { connect } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import Store from '../Store/configureStore';
import { requestGeolocalisationPermission, updateCoordinates } from './map'
import I18n from '../Translation/configureTrans';

import { generateCourse } from '../apiServer/course';
import InputSetting from './InputSettings';
import Switch from './Switch';

import Step from './components/Step';
import NextStep from './components/NextStep';
import SwitchButton from './components/SwitchButton';
import TimePicker from './components/TimePicker';
import PrimaryButton from './components/PrimaryButton';
import SecondaryButton from './components/SecondaryButton';
import Footer from './components/Footer';
import { Slider } from 'react-native-elements';
import NumberPicker from './components/NumberPicker';

const globalStyles = require('../Styles');

async function PopUpReq(pos, course) {
  const store = Store.getState();
  const access_Token = store.profil.access_token;
  const coordinate = [];
  const test = JSON.stringify({ course: course })
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
    });

}

async function confirmeSettings(pos, budget, hours, minutes, props, eat, radius, placeNbr, is18, setLoading) {

  const store = Store.getState();
  var tags = store.profil.tags;
  const access_token = store.profil.access_token;
  var tempTags = [];

  if (tags.length < 1) {
    tags = store.profil.tags_list;
  }
  if (store.CourseSettings.Temporarytags.length > 0) {
    tempTags = store.CourseSettings.Temporarytags
  }
  const settings = {
    pos: pos,
    budget: budget,
    hours: hours,
    minutes: minutes,
    eat: eat,
    radius: radius,
    placeNbr: placeNbr,
    tags: tags,
    locations_list: 0,
    is18: is18,
    tempTags: tempTags,
    friendstags: store.CourseSettings.friendstags
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
  action = {
    type: 'ADD_AGE',
    value: is18
  };
  Store.dispatch(action);
  props.navigation.navigate("TripSuggestion");

  /*await fetch(`http://${IP_SERVER}:${PORT_SERVER}/generator/generate_course`, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    access_Token,
    'time': time,
    'budget': budget,
    'tags': tags,
    'coordinate' : coordinate,
    'eat' : eat,
    'radius' : radius,
    'placenbr' : placeNbr,
    'is18' : is18,
    'temptags' : tempTags
  },
  method: 'GET',
  })
  .then(res => res.json())
  .then(json => {
    console.log("algo done:   ", json);
    //PopUpReq(pos, json.generated_course);
    action = {
      type: 'ADD_COURSE',
      value: json.course
    };
    Store.dispatch(action);
    action = {
      type: 'ADD_COURSE_LOCATIONS',
      value: json.generate_course
    };
    Store.dispatch(action);
    props.profil.scoreCourse = json.generated_course
    props.profil.first_name = pos
    props.navigation.navigate("TripSuggestion");
  }).catch((error) => {
    console.error('error :', error);
  });*/
  //console.log("test success");
}

//function Back(props) {
//  props.navigation.navigate('HomePage');
//}

export function CourseSettings(props) {

  const [CourseSettingStep, setCourseSettingStep] = useState(1);

  const hourOption = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const minuteOption = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  const [hourSelected, setHourSelected] = useState(2);
  const [minuteSelected, setMinuteSelected] = useState(6);

  const [budget, setBudget] = useState(2);
  const [radius, setRadius] = useState(3);
  const [placeNbr, setPlaceNbr] = useState(2);

  const [hours, setHours] = useState('2');
  const [minutes, setMinutes] = useState('30');
  const [pos, setPos] = useState('0');
  const [isEatDrink, setEatDring] = useState(false);
  const [isTripTogether, setTripTogether] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [is18, setIs18] = useState(true);

  useEffect(() => {
    if (props.position.asked == false) {
      requestGeolocalisationPermission(props.dispatch);
    }
    if (props.position.permission == true && pos == '0') {
      updateCoordinates(setPos);
    }
    if (props.permission && pos && localRegion.latitude && localRegion.longitude) {
      setPermision(true);
    }
  });

  return (
    <View style={globalStyles.container}>
      <Step actualStep={CourseSettingStep} finishStep={9} onPressFct={() => setCourseSettingStep(CourseSettingStep - 1)} />

      {CourseSettingStep === 1 &&
        <>
          <View>
            <Text style={globalStyles.titles}>{I18n.t('CourseSettings.spendingTime')}</Text>
            <Text style={[globalStyles.subparagraphs, { marginTop: 16 }]}>{I18n.t('CourseSettings.spendingTime2')}</Text>
            <TimePicker
              hourOption={hourOption}
              hourSelected={hourSelected}
              setHourSelected={setHourSelected}
              minuteOption={minuteOption}
              minuteSelected={minuteSelected}
              setMinuteSelected={setMinuteSelected}
            />
          </View>
          <NextStep text={I18n.t('CourseSettings.nextStep')} onPressFct={() => setCourseSettingStep(CourseSettingStep + 1)} />
        </>
      }

      {CourseSettingStep === 2 &&
        <>
          <View>
            <Text style={globalStyles.titles}>{I18n.t('CourseSettings.budget')}</Text>
            <Text style={[globalStyles.subparagraphs, { marginTop: 16 }]}>{I18n.t('CourseSettings.budget2')}</Text>
            <NumberPicker min={0} max={250} increment={10} text="€" indexList={budget} setIndexList={setBudget}/>
          </View>
          <NextStep text={I18n.t('CourseSettings.nextStep')} onPressFct={() => setCourseSettingStep(CourseSettingStep + 1)} />
        </>
      }

      {CourseSettingStep === 3 &&
        <>
          <View>
            <Text style={globalStyles.titles}>{I18n.t('CourseSettings.distance')}</Text>
            <Text style={[globalStyles.subparagraphs, { marginTop: 16 }]}>{I18n.t('CourseSettings.distance2')}</Text>
            <View style={{ marginTop: 32, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={[globalStyles.subparagraphs, { fontSize: 10 }]}>{I18n.t('CourseSettings.short')}</Text>
              <Text style={globalStyles.subparagraphs}>{radius} km</Text>
              <Text style={[globalStyles.subparagraphs, { fontSize: 10, textAlign: 'right' }]}>{I18n.t('CourseSettings.long')}</Text>
            </View>
            <Slider
              maximumValue={20}
              minimumValue={1}
              step={1}
              minimumTrackTintColor="#0989FF"
              value={radius}
              onValueChange={(value) => setRadius(value)}
              trackStyle={{ height: 4 }}
              thumbStyle={{
                width: 24,
                height: 24,
                borderRadius: 16,
                backgroundColor: '#FFFFFF',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5, },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
              }}
            />
          </View>
          <NextStep text={I18n.t('CourseSettings.nextStep')} onPressFct={() => setCourseSettingStep(CourseSettingStep + 1)} />
        </>
      }

      {CourseSettingStep === 4 &&
        <>
          <View>
            <Text style={globalStyles.titles}>{I18n.t('CourseSettings.places')}</Text>
            <Text style={[globalStyles.subparagraphs, { marginTop: 16 }]}>{I18n.t('CourseSettings.maxPlaces')}</Text>
            <NumberPicker min={1} max={30} increment={1} text="Lieux" indexList={placeNbr} setIndexList={setPlaceNbr}/>
          </View>
          <NextStep text={I18n.t('CourseSettings.nextStep')} onPressFct={() => setCourseSettingStep(CourseSettingStep + 1)} />
        </>
      }

      {CourseSettingStep === 5 &&
        <>
          <View>
            <Text style={globalStyles.titles}>{I18n.t('CourseSettings.major')}</Text>
            <Text style={[globalStyles.subparagraphs, { marginTop: 16 }]}>{I18n.t('CourseSettings.major2')}</Text>
            <SwitchButton textTrue={I18n.t('CourseSettings.majorTrue')}textFalse={I18n.t('CourseSettings.majorFalse')} switchValue={is18} onSwitchFct={() => setIs18(previousState => !previousState)} />
          </View>
          <NextStep text={I18n.t('CourseSettings.nextStep')} onPressFct={() => setCourseSettingStep(CourseSettingStep + 1)} />
        </>
      }

      {CourseSettingStep === 6 &&
        <>
          <View>
            <Text style={globalStyles.titles}>{I18n.t('CourseSettings.eatDrink')}</Text>
            <Text style={[globalStyles.subparagraphs, { marginTop: 16 }]}>{I18n.t('CourseSettings.eatDrink2')}</Text>
            <SwitchButton textTrue={I18n.t('CourseSettings.yes')} textFalse={I18n.t('CourseSettings.no')} switchValue={isEatDrink} onSwitchFct={() => setEatDring(previousState => !previousState)} />
          </View>
          <NextStep text={I18n.t('CourseSettings.nextStep')} onPressFct={() => setCourseSettingStep(CourseSettingStep + 1)} />
        </>
      }
      {CourseSettingStep === 7 &&
        <>
          <View>
            <Text style={globalStyles.titles}>{I18n.t('CourseSettings.multipleTrips')}</Text>
            <Text style={[globalStyles.subparagraphs, { marginTop: 16 }]}>{I18n.t('CourseSettings.multipleTrips2')}</Text>
          </View>
          <SecondaryButton
            text={I18n.t('CourseSettings.chooseFriend')}
            onPressFct={() => {
              props.navigation.navigate("FriendSelection");
            }}
          />
          <NextStep text={I18n.t('CourseSettings.nextStep')} onPressFct={() => setCourseSettingStep(CourseSettingStep + 1)} />
        </>
      }
      {CourseSettingStep === 8 &&
        <>
          <View>
            <Text style={globalStyles.titles}>{I18n.t('CourseSettings.startPoint')}</Text>
            <Text style={[globalStyles.subparagraphs, { marginTop: 16 }]}>{I18n.t('CourseSettings.startPoint2')}</Text>
          </View>
          <SecondaryButton
            text={I18n.t("CourseSettings.startPoint3")}
            onPressFct={() => {
              props.navigation.navigate("ChosePosition");
            }}
          />
          <NextStep text={I18n.t('CourseSettings.nextStep')} onPressFct={() => setCourseSettingStep(CourseSettingStep + 1)} />
        </>
      }
      {CourseSettingStep === 9 &&
        <>
          <View style={{width: "100%", marginBottom: 16}}>
            <Text style={globalStyles.titles}>{I18n.t("CourseSettings.tmpTags")}</Text>
            <Text style={[globalStyles.subparagraphs, { marginTop: 16 }]}>{I18n.t("CourseSettings.tmpTags2")}</Text>
          </View>
          <SecondaryButton
            text={I18n.t("CourseSettings.tmpTags3")}
            onPressFct={() => {
              props.navigation.navigate("Temporarytags");
            }}
          />
          <Footer
            primaryText={I18n.t("CourseSettings.start")}
            primaryOnPressFct={() => {
              console.log("hour: ", hourOption[hourSelected]);
              console.log("minute: ", minuteOption[minuteSelected]);

              console.log("budget: ", budget*10);
              console.log("distance", radius);
              console.log("nbr de lieux", placeNbr+1);
              console.log("majeur ? ", is18);
              console.log("manger boire ? ", isEatDrink);
              confirmeSettings(pos, budget*10, hourOption[hourSelected], minuteOption[minuteSelected], props, isEatDrink, radius, placeNbr+1, is18, setLoading);
            }}
          />
        </>
      }
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

    // <ScrollView style={styles.view_back}>
    //   <View style={styles.view_header}>
    //     {/* <TouchableOpacity onPress={() => navigation.navigate('Menu')}> */}
    //     <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
    //       <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
    //     </TouchableOpacity>
    //     <Text style={styles.text_header}>
    //       {I18n.t('Header.options')}
    //       {'   '}
    //     </Text>
    //   </View>
    //   <View style={styles.view_options}>
    //     <InputSetting title={"Budget"} text={"Euros"} value={budget} setValue={setBudget} />
    //     <View style={styles.view_option}>
    //       <Text style={styles.text_option}>
    //         Spending Time
    //       </Text>
    //       <View style={styles.view_separator} />
    //       <View style={styles.view_optionInput}>
    //         <TextInput
    //       autoCapitalize={'none'}
    //           style={styles.textInput_optionInput}
    //           keyboardType="numeric"
    //           onChangeText={(text) => setHours(text)}
    //           value={hours}
    //           maxLength={2}
    //         />
    //         <Text style={styles.text_optionInput}>
    //           Hour(s)
    //         </Text>
    //       </View>
    //       <View style={styles.view_optionInput}>
    //         <TextInput
    //       autoCapitalize={'none'}
    //           style={styles.textInput_optionInput}
    //           keyboardType="numeric"
    //           onChangeText={(text) => setMinutes(text)}
    //           value={minutes}
    //           maxLength={2}
    //         />
    //         <Text style={styles.text_optionInput}>
    //           Minute(s)
    //         </Text>
    //       </View>
    //     </View>
    //     <InputSetting title={"Distance"} text={"Km"} value={radius} setValue={setRadius} />
    //     <InputSetting title={"Nombre de lieux max"} text={"Lieux"} value={placeNbr} setValue={setPlaceNbr} />
    //     <View style={styles.view_option}>
    //       <Text style={styles.text_option}>
    //         Alimentation
    //       </Text>
    //       <View style={styles.view_separator} />
    //       <View style={styles.view_optionInput}>
    //         <Text style={styles.text_optionInput}>
    //           Souhaitez-vous manger et boire ?
    //         </Text>
    //         <Switch value={isEatDrink} setValue={setEatDring} />
    //       </View>
    //     </View>
    //     <View style={styles.view_option}>
    //       <Text style={styles.text_option}>
    //         Trajet à plusieurs
    //       </Text>
    //       <View style={styles.view_separator} />
    //       <View style={styles.view_optionInput}>
    //         <Text style={styles.text_optionInput}>
    //           Partager le trajet avec vos amis ?
    //         </Text>
    //         <Switch value={isTripTogether} setValue={setTripTogether} />
    //         <TouchableOpacity
    //           id="test"
    //           style={styles.ButtonTags}
    //           onPress={() => {
    //             props.navigation.navigate("FriendSelection");
    //           }}
    //         >
    //           <Text style={styles.text_newTrip}>
    //             Chose Friends
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //       <Text style={styles.text_option}>
    //         "Restriction d'age"
    //       </Text>
    //       <View style={styles.view_separator} />
    //       <View style={styles.view_optionInput}>
    //         <Text style={styles.text_optionInput}>
    //           Aves vous plus de 18 ans ?
    //         </Text>
    //         <Switch value={is18} setValue={setIs18} />
    //       </View>
    //       <TouchableOpacity
    //         id="test"
    //         style={styles.view_newTrip}
    //         onPress={() => {
    //           props.navigation.navigate("Temporarytags");
    //         }}
    //       >
    //         <Text style={styles.text_newTrip}>
    //           Use temporary tags
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    //   <TouchableOpacity
    //     id="test"
    //     style={styles.view_newTrip}
    //     onPress={() => {
    //       setLoading(true);
    //       confirmeSettings(pos, budget, hours, minutes, props, isEatDrink, radius, placeNbr, is18, setLoading);
    //     }}
    //   >
    //     <Text style={styles.text_newTrip}>
    //       Confirm my options
    //     </Text>
    //   </TouchableOpacity>
      // <Modal
      //   animationType="none"
      //   transparent={true}
      //   visible={isLoading}
      // >
      //   <View style={styles.loading_screen}>
      //     <ActivityIndicator size="large"  color="black" style={{}}/>
      //   </View>
      // </Modal>
    // </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return (
    {
      position: state.position,
      profil: state.profil,
      map: state.map
    }
  );
};
export default connect(mapStateToProps)(CourseSettings);

const styles = StyleSheet.create({
  view_back: {
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
  view_options: {
    height: '80%',
    width: '100%',
  },
  view_option: {
    marginTop: 30,
    flexDirection: 'column',
  },
  text_option: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  view_optionInput: {
    marginTop: 5,
    marginBottom: 5,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  textInput_optionInput: {
    flex: 270,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 5,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  text_optionInput: {
    flex: 76,
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
  },
  view_separator: {
    height: 3,
    marginTop: 2,
    marginBottom: 5,
    borderRadius: 2,
    width: '100%',
    backgroundColor: '#0092A7',
  },
  view_newTrip: {
    flex: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 45,
    marginTop: 12.5,
    marginBottom: 35.5,
    backgroundColor: '#0092A7',
  },
  ButtonTags: {
    flex: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: '100%',
    marginTop: 12.5,
    marginBottom: 35.5,
    backgroundColor: '#0092A7',
  },
  text_newTrip: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  loading_screen: {
    backgroundColor: 'rgba(100,100,100,0.75)',
    display: "flex",
    justifyContent: 'space-around',
    height: '100%'
  }
});
