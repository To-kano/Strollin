import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { getTimeZone } from 'react-native-localize';
import I18n from '../Translation/configureTrans';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import {GetPlaces} from '../apiServer/tag';
import { requestGeolocalisationPermission, updateCoordinates } from './map'
import {translateTags, detranslateTags} from '../Translation/translateTags'

export function Header({ navigation, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);

  if (pressed === false) {
    return (
      <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.tags')}
        </Text>
        <TouchableOpacity
          onPress={() => { setpressed(!pressed); }}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/search.png')} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.view_header}>
      <TextInput
          autoCapitalize={'none'}
        style={styles.textInput_header}
        placeholder={I18n.t('Header.search_tag')}
      />
      <TouchableOpacity
        onPress={() => { setpressed(!pressed); }}
      >
        <Image style={styles.img_header} source={require('../images/icons/black/search.png')} />
      </TouchableOpacity>
    </View>
  );
}

export function Tag({ name, chosen, defaultState = false, props,  access_Token, pos}) {
  const [pressed, setpressed] = useState(defaultState);
  const [args, setArgs] = useState(true);

  async function postTags(body) {
    const store = Store.getState();
    var action = {};
    const tmpArray = store.CourseSettings.Temporarytags;

    tmpArray.push(body)
    action = {
      type: 'ADD_TEMPORARYTAGS',
      value: tmpArray
    };
    Store.dispatch(action);
    //console.log(store.CourseSettings.Temporarytags);
    GetPlaces(access_Token, body, pos)
  }

  async function RemoveTags(body) {
    const store = Store.getState();
    var action = {};
    var array = store.CourseSettings.Temporarytags;

    console.log("ARRAY: ", array);
    for (var i = 0; i < array.length; i++) {
      if (array[i] == body) {
        array.splice(i, 1)
        break;
      }
    }
    console.log("ARRAY: ", array);
    action = {
      type: 'ADD_TEMPORARYTAGS',
      value: array
    };
    Store.dispatch(action);
    console.log(store.CourseSettings.Temporarytags);
  }

  useEffect(() => {
    console.log('hola');
    setpressed(chosen);
  }, []);

  return (
    <View style={styles.view_tags}>
      {pressed === false && (
      <TouchableOpacity
        style={styles.view_tagOff}
        onPress={() => {
          postTags(name);
          setpressed(!pressed);
        }}
      >
        <Text style={styles.text_tagOff}>{translateTags(name)}</Text>
      </TouchableOpacity>
      )}
      {(pressed === true) && (
      <TouchableOpacity
        style={styles.view_tagOn}
        onPress={() => {
          console.log('unpressed');
          RemoveTags(name);
          setpressed(!pressed);
        }}
      >
        <Image style={styles.img_tagOn} source={require('../images/icons/white/checked.png')} />
        <Text style={styles.text_tagOn}>{translateTags(name)}</Text>
      </TouchableOpacity>
      )}
    </View>
  );
}

export function Temporarytags(props) {
  const [array, setArray] = useState(true);
  const store = Store.getState();
  const access_Token = store.profil.access_token;
  const [pos, setPos] = useState(store.CourseSettings.pos);

  setUserPos();
  function setUserPos() {
    if (props.position.asked == false) {
      requestGeolocalisationPermission(props.dispatch);
    }
    if (props.position.permission == true && pos == '0') {
      updateCoordinates(setPos);
    }
    if (props.permission && pos && localRegion.latitude && localRegion.longitude) {
      setPermision(true);
    }
  }

  async function buildArray(List) {
    const arr = [];

    console.log('hello');
    for (let i = 0; i < List.length; i++) {
      arr.push({name: List[i].name, pressed: false})
    }
    console.log('array: ', arr);
    setArray(arr);
  }

  async function getThings() {
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/tag/get_tag`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
      },
      method: 'GET',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('yooooo', json.tags_list);
        buildArray(json.tags_list)
        //setArgs(json.tags_list);
        //getLocationTags(json.tags_list);
      });
  }

  useEffect(() => {
    getThings();
    var action = {
      type: 'ADD_TEMPORARYTAGS',
      value: []
    };
    Store.dispatch(action);
  }, []);

  return (
    <View style={styles.view_back}>
      <Header navigation={props.navigation} />
      <View style={styles.viex_list}>
        <Text style={styles.text_field}>
          {I18n.t('Tags.select_our_tags')}
          <Text style={styles.text_star}> *</Text>
        </Text>
        <FlatList
          data={array}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Tag name={item.name} chosen={item.pressed} access_Token={access_Token} pos={pos}/>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          props.navigation.navigate('CourseSettings');
        }}
      >
        <Text style={styles.text_button}>
          {I18n.t('Tags.confirm_my_tags')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Temporarytags);

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
  textInput_header: {
    height: 40,
    width: '85%',
    borderRadius: 21,
    marginRight: 12.5,
    paddingLeft: 12.5,
    backgroundColor: '#FFFFFF',
  },
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
  text_header: {
    width: '77.8%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  viex_list: {
    flex: 703,
    width: '100%',
  },
  text_field: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 12.5,
  },
  text_star: {
    fontWeight: 'bold',
    color: '#FF0000',
    fontSize: 16,
  },
  view_tags: {
    marginBottom: 9,
  },
  view_tagOff: {
    borderRadius: 25,
    borderWidth: 3,
    padding: 9,
    borderColor: '#000000',
    backgroundColor: '#E1E2E7',
  },
  text_tagOff: {
    textTransform: 'capitalize',
    width: '100%',
    height: 22,
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view_tagOn: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 3,
    padding: 9,
    borderColor: '#0092A7',
    backgroundColor: '#0092A7',
  },
  img_tagOn: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  text_tagOn: {
    textTransform: 'capitalize',
    width: '86%',
    height: 22,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view_button: {
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
  text_button: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // back: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  // fill: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   flex: 1,
  //   backgroundColor: '#FFFFFF',
  //   padding: 5,
  //   paddingTop: 25,
  //   margin: 10,
  //   width: '95%',
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
  // newTrip: {
  //   alignItems: 'center',
  //   backgroundColor: '#F07323',
  //   paddingVertical: '5%',
  //   paddingHorizontal: '30%',
  //   borderRadius: 5,
  // },
});
