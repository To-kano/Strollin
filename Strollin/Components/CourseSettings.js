import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, TextInput,
} from 'react-native';
import Stars from 'react-native-stars';
import { connect } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import Store from '../Store/configureStore';
import { requestGeolocalisationPermission, updateCoordinates } from './map'
import I18n from '../Translation/configureTrans';

import {generateCourse} from '../apiServer/course';

async function PopUpReq(pos, course) {
  const store = Store.getState();
  const access_Token = store.profil.access_token;
  const coordinate = [];
  const test = JSON.stringify({course: course})
  coordinate[0] = pos.latitude;
  coordinate[1] = pos.longitude;

  await fetch(`https://${IP_SERVER}:${PORT_SERVER}/generator/generate_popup`, {
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
  //console.log("JJJJJJJJJJJJSSSSSSSSSSSSSSSSOOOOOOOOOONNNNNNNNNn: ", json);
  });

}

async function confirmeSettings(pos, budget, hours, minutes, props, eat, radius, placeNbr) {

  const store = Store.getState();
  const tags = store.profil.tags_list;
  const access_Token = store.profil.access_token;
  const time = hours * 60 + minutes;
  const coordinate = [];

  coordinate[0] = pos.latitude;
  coordinate[1] = pos.longitude;

  const settings = {
    pos : pos,
    budget : budget,
    hours : hours,
    minutes : minutes,
    isEatDrink : eat,
    radius : radius,
    placeNbr : placeNbr,
    tags : tags
  }

  let action = {
    type: 'SET_COURSE_SETTINGS',
    value: settings
  };
  Store.dispatch(action);

  const result = await generateCourse(access_token, settings);

  action = {
    type: 'ADD_COURSE',
    value: result.course
  };
  Store.dispatch(action);
  action = {
    type: 'ADD_COURSE_LOCATIONS',
    value: result.generate_course
  };
  Store.dispatch(action);
  props.navigation.navigate("TripSuggestion");
}

//function Back(props) {
//  props.navigation.navigate('HomePage');
//}

export function CourseSettings(props) {
  const [hours, setHours] = useState('2');
  const [minutes, setMinutes] = useState('30');
  const [budget, setBudget] = useState('20');
  const [pos, setPos] = useState('0');
  const [isEatDrink, setEatDring] = useState(false);
  const [radius, setRadius] = useState('3');
  const [placeNbr, setPlaceNbr] = useState('10');

  function Switch() {

    if (isEatDrink === false) {
      return (
        <TouchableOpacity
          style={styles.view_switchOff}
          onPress={() => { setEatDring(!isEatDrink); }}
        >
          <View style={styles.view_switchIn} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.view_switchOn}
        onPress={() => { setEatDring(!isEatDrink); }}
      >
        <View style={styles.view_switchIn} />
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    //console.log("ntm: ", props.position.permission);
    if (props.position.asked == false) {
      requestGeolocalisationPermission(props.dispatch);
    }
    if (props.position.permission == true && pos == '0') {
      updateCoordinates(setPos);
    }
    if (props.permission && pos && localRegion.latitude && localRegion.longitude) {
    //console.log("3");
      setPermision(true);
    }
  });

  return (
    <ScrollView style={styles.view_back}>
      <View style={styles.view_header}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Menu')}> */}
        <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.options')}
          {'   '}
        </Text>
      </View>
      <View style={styles.view_options}>
        <View style={styles.view_option}>
          <Text style={styles.text_option}>
            Budget
          </Text>
          <View style={styles.view_separator} />
          <View style={styles.view_optionInput}>
            <TextInput
              autoCapitalize={'none'}
              style={styles.textInput_optionInput}
              keyboardType="numeric"
              onChangeText={(text) => setBudget(text)}
              value={budget}
              maxLength={6}
            />
            <Text style={styles.text_optionInput}>
              Euros
            </Text>
          </View>
        </View>
        <View style={styles.view_option}>
          <Text style={styles.text_option}>
            Spending Time
          </Text>
          <View style={styles.view_separator} />
          <View style={styles.view_optionInput}>
            <TextInput
          autoCapitalize={'none'}
              style={styles.textInput_optionInput}
              keyboardType="numeric"
              onChangeText={(text) => setHours(text)}
              value={hours}
              maxLength={2}
            />
            <Text style={styles.text_optionInput}>
              Hour(s)
            </Text>
          </View>
          <View style={styles.view_optionInput}>
            <TextInput
          autoCapitalize={'none'}
              style={styles.textInput_optionInput}
              keyboardType="numeric"
              onChangeText={(text) => setMinutes(text)}
              value={minutes}
              maxLength={2}
            />
            <Text style={styles.text_optionInput}>
              Minute(s)
            </Text>
          </View>
        </View>
        <View style={styles.view_option}>
          <Text style={styles.text_option}>
            Distance
          </Text>
          <View style={styles.view_separator} />
          <View style={styles.view_optionInput}>
            <TextInput
              style={styles.textInput_optionInput}
              keyboardType="numeric"
              onChangeText={(text) => setRadius(text)}
              value={radius}
              maxLength={6}
            />
            <Text style={styles.text_optionInput}>
              Km
            </Text>
          </View>
        </View>
        <View style={styles.view_option}>
          <Text style={styles.text_option}>
            Nombre de lieux max
          </Text>
          <View style={styles.view_separator} />
          <View style={styles.view_optionInput}>
            <TextInput
              style={styles.textInput_optionInput}
              keyboardType="numeric"
              onChangeText={(text) => setPlaceNbr(text)}
              value={placeNbr}
              maxLength={6}
            />
            <Text style={styles.text_optionInput}>
              Lieux
            </Text>
          </View>
        </View>
        <View style={styles.view_option}>
          <Text style={styles.text_option}>
            Alimentation
          </Text>
          <View style={styles.view_separator} />
          <View style={styles.view_optionInput}>
            <Text style={styles.text_optionInput}>
              Souhaitez-vous manger et boire ?
            </Text>
            <Switch/>
          </View>
        </View>
      </View>
      <TouchableOpacity
        id="test"
        style={styles.view_newTrip}
        onPress={() => {
          confirmeSettings(pos, budget, hours, minutes, props, isEatDrink, radius, placeNbr);
        }}
      >
        <Text style={styles.text_newTrip}>
          Confirm my options
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    flex: 700,
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
  view_switchOff: {
    height: 30,
    borderRadius: 20,
    flex: 15,
    flexDirection: 'row',
    backgroundColor: '#BCBCBC',
  },
  view_switchOn: {
    height: 30,
    borderRadius: 20,
    flex: 15,
    flexDirection: 'row-reverse',
    backgroundColor: '#0092A7',
  },
  view_switchIn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  view_separator: {
    height: 3,
    marginTop: 2,
    marginBottom: 5,
    borderRadius: 2,
    width: '100%',
    backgroundColor:'#0092A7',
  },
  view_newTrip: {
    flex: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 45,
    marginTop: 12.5,
    marginBottom: 12.5,
    backgroundColor: '#0092A7',
  },
  text_newTrip: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});
