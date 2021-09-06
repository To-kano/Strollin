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

function Header({ navigation, defaultState = false }) {
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
          {I18n.t('Header.friends')}
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
        placeholder={I18n.t('Header.search_friend')}
      />
      <TouchableOpacity
        onPress={() => { setpressed(!pressed); }}
      >
        <Image style={styles.img_header} source={require('../images/icons/black/search.png')} />
      </TouchableOpacity>
    </View>
  );
}

export function Friend({ name, chosen, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);

  useEffect(() => {
    setpressed(chosen);
  }, []);

  return (
    <View style={styles.view_friends}>
      {pressed === false && (
      <TouchableOpacity
        style={styles.view_friendOff}
        onPress={() => {
          setpressed(!pressed);
        }}
      >
        <Text style={styles.text_friendOff}>{"nom de l'ami"}</Text>
      </TouchableOpacity>
      )}
      {(pressed === true) && (
      <TouchableOpacity
        style={styles.view_friendOn}
        onPress={() => {
          setpressed(!pressed);
        }}
      >
        <Image style={styles.img_friendOn} source={require('../images/icons/white/checked.png')} />
        <Text style={styles.text_friendOn}>{"nom de l'ami"}</Text>
      </TouchableOpacity>
      )}
    </View>
  );
}

export function FriendSelection({ navigation }) {
  const [args, setArgs] = useState(true);
  const [Profargs, setProfArgs] = useState(true);
  const [array, setArray] = useState(true);

  const store = Store.getState();
  const access_Token = store.profil.access_token;

  async function buildArray(List, UserList) {
    const arr = [];
    let flag = false;

  //console.log('hello');
    for (let i = 0; i < List.length; i++) {
      for (let j = 0; j < UserList.length; j++) {
        if (UserList[j] == List[i].name) {
        //console.log('hellot: ', UserList[j]);
          arr.push({ name: UserList[j], _id: List[i]._id, pressed: true });
          flag = true;
          break;
        }
      }
      if (flag == false) arr.push({ name: List[i].name, _id: List[i]._id, pressed: false });
      flag = false;
    }
  //console.log('array: ', arr);
    setArray(arr);
  }

  async function getUserTags(List) {
    await fetch(`https://${IP_SERVER}:${PORT_SERVER}/users/get_own_profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
      },
      method: 'GET',
    })
      .then((res) => res.json())
      .then((json) => {
      //console.log('########', json.profile.tags_list);
        setProfArgs(json.profile.tags_list);
        buildArray(List, json.profile.tags_list);
      });
  }

  async function getThings() {
    await fetch(`https://${IP_SERVER}:${PORT_SERVER}/tag/get_tag`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
      },
      method: 'GET',
    })
      .then((res) => res.json())
      .then((json) => {
      //console.log('yooooo', json.tags_list);
        setArgs(json.tags_list);
        getUserTags(json.tags_list);
      });
  }

  useEffect(() => {
    getThings();
    // getUserTags();
  }, []);
  return (
    <View style={styles.view_back}>
      <Header navigation={navigation} />
      <View style={styles.viex_list}>
        <Text style={styles.text_field}>
          {I18n.t('TripTogether.addFriend')}
          <Text style={styles.text_star}> *</Text>
        </Text>
        <FlatList
          data={array}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Friend name={item.name} chosen={item.pressed} />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          navigation.navigate('TripSuggestion');
        }}
      >
        <Text style={styles.text_button}>
          {I18n.t('TripTogether.addFriend')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(FriendSelection);

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
  view_friends: {
    marginBottom: 9,
  },
  view_friendOff: {
    borderRadius: 25,
    borderWidth: 3,
    padding: 9,
    borderColor: '#000000',
    backgroundColor: '#E1E2E7',
  },
  text_friendOff: {
    textTransform: 'capitalize',
    width: '100%',
    height: 22,
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view_friendOn: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 3,
    padding: 9,
    borderColor: '#0092A7',
    backgroundColor: '#0092A7',
  },
  img_friendOn: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  text_friendOn: {
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
});
