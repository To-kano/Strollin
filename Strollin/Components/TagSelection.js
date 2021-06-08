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
import {translateTags, detranslateTags} from '../Translation/translateTags'

export function Header({ navigation, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);

  if (pressed === false) {
    return (
      <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          // onPress={() => navigation.navigate('Menu')}
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
        style={styles.textInput_header}
        placeholder={I18n.t('Header.search_tag')}
      />
      <TouchableOpacity
        // onPress={setSortedTendanceData}
        onPress={() => { setpressed(!pressed); }}
      >
        <Image style={styles.img_header} source={require('../images/icons/black/search.png')} />
      </TouchableOpacity>
    </View>
  );
}

export function Tag({ name, chosen, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);
  const [args, setArgs] = useState(true);

  async function postTags(body) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;

    const list = [body];
    const test = JSON.stringify({ tags_list: list });

    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_tag`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token
      },
      body: test,
      method: 'POST',
    })
      .then((res) => res.json())
      .then((json) => {
      });
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

export function TagSelection({ navigation, profil }) {
  const [args, setArgs] = useState(true);
  const [Profargs, setProfArgs] = useState(true);
  const [array, setArray] = useState(true);

  const store = Store.getState();
  const access_Token = store.profil.access_token;

  async function buildArray(List, UserList) {
    const arr = [];
    let flag = false;

    console.log('hello');
    for (let i = 0; i < List.length; i++) {
      for (let j = 0; j < UserList.length; j++) {
        if (UserList[j] == List[i].name) {
          console.log('hellot: ', UserList[j]);
          arr.push({ name: UserList[j], _id: List[i]._id, pressed: true });
          flag = true;
          break;
        }
      }
      if (flag == false) arr.push({ name: List[i].name, _id: List[i]._id, pressed: false });
      flag = false;
    }
    console.log('array: ', arr);
    setArray(arr);
  }

  async function getUserTags(List) {
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/get_own_profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
      },
      method: 'GET',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('########', json.profile.tags_list);
        setProfArgs(json.profile.tags_list);
        buildArray(List, json.profile.tags_list);
      });
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
          {I18n.t('Tags.select_our_tags')}
          <Text style={styles.text_star}> *</Text>
        </Text>
        <FlatList
          data={array}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Tag name={item.name} chosen={item.pressed} />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        <Text style={styles.text_button}>
          {I18n.t('Tags.confirm_my_tags')}
        </Text>
      </TouchableOpacity>
    </View>
    // <View style={styles.back}>
    //   <BackgroundImage />
    //   <View style={styles.fill}>
    //     <Text style={[{ textAlign: 'left', color: 'black', fontSize: 25 }]}>
    //       {I18n.t('welcome')}
    //     </Text>
    //     <Text style={[
    //       {
    //         textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 25
    //       }
    //     ]}
    //     >
    //       {profil.pseudo}
    //     </Text>
    //     <Text style={[{
    //       textAlign: 'left',
    //       color: 'black',
    //       fontSize: 18,
    //       marginTop: 18,
    //       fontWeight: 'normal',
    //     }]}
    //     >
    //       {I18n.t('chooseTags')}
    //     </Text>
    //     <View style={{ flex: 2, margin: 10, marginTop: 40 }}>
    //       <FlatList
    //         data={data}
    //         renderItem={({ item }) => (
    //           <Tag name={item.name} pressed={item.pressed} />
    //         )}
    //       />
    //       <TouchableOpacity
    //         style={styles.newTrip}
    //         onPress={() => navigation.navigate('Profile')}
    //         // onPress={() =>
    //         //  // this.NextPage(navigation.getParam('uid'))
    //         // }
    //       >
    //         <Text style={{ fontSize: 16, color: '#FFFFFF' }}>{I18n.t('next')}</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TagSelection);

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
