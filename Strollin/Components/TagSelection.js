import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator, Modal
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { getTimeZone } from 'react-native-localize';
import I18n from '../Translation/configureTrans';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import {translateTags, detranslateTags} from '../Translation/translateTags'
import {GetPlaces} from '../apiServer/tag';
import { requestGeolocalisationPermission, updateCoordinates } from './map'
import Footer from './components/Footer';
import MenuButton from './components/MenuButton';
import Icon from './components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import PrimaryButton from './components/PrimaryButton';

const globalStyles = require('../Styles');

function Header({ navigation, defaultState = false }) {
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
          autoCapitalize={'none'}
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

export function Tag({ name, chosen, setLoading, pos, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);
  const [args, setArgs] = useState(true);

  async function postTags(body, setLoading) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;

    const list = [body];
    const test = JSON.stringify({ tags_list: list });

    const tagsArray = store.profil.tags;
    tagsArray.push(body);
    console.log("body: ", tagsArray);
    let action = {
      type: 'SET_USER_TAGS',
      value: tagsArray
    };
    Store.dispatch(action);
    console.log("CONTINUE");
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
      })
      .then(setLoading(false)
      );
    GetPlaces(access_Token, body, pos)
  }

  useEffect(() => {
    setpressed(chosen);
  }, []);

  return (
    <>
      {pressed
      ? <TouchableOpacity style={[globalStyles.tag, {flexDirection: 'row', alignItems: 'center', justifyContent : 'space-around'}]} onPress={() => { setpressed(!pressed); }} >
          <Text style={[globalStyles.subparagraphs, {marginRight: 11, textTransform: 'capitalize'}]}>{translateTags(name)}</Text>
          <Icon name="checked" size={24} color="#1C1B1C"/>
        </TouchableOpacity>
      : <TouchableOpacity
        style={[globalStyles.tag, {flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: "#1C1B1C", justifyContent : 'space-around'}]}
        onPress={() => {
          setLoading(true);
          console.log("bonjour");
          postTags(name, setLoading);
          setpressed(!pressed);
        }}
      >
        <Text style={[globalStyles.subparagraphs, {marginRight: 11, textTransform: 'capitalize'}]}>{translateTags(name)}</Text>
          <Icon name="add" size={24} color="#1C1B1C"/>
      </TouchableOpacity>
      }
    </>
  );
}

export function TagSelection(props, { navigation, profil }) {
  const [args, setArgs] = useState(true);
  const [Profargs, setProfArgs] = useState(true);
  const [array, setArray] = useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [pos, setPos] = useState('0');
  const [firstTime, setFirstTime] = useState(true);

  const store = Store.getState();
  const access_Token = store.profil.access_token;

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

  function setUserTags(tags) {
    let action = {
      type: 'SET_USER_TAGS',
      value: tags
    };
    Store.dispatch(action);
  }

  async function buildArray(List, UserList) {
    const arr = [];
    let flag = false;

    for (let i = 0; i < List.length; i++) {
      for (let j = 0; j < UserList.length; j++) {
        if (UserList[j] == List[i].name) {
          arr.push({ name: UserList[j], _id: List[i]._id, pressed: true });
          flag = true;
          break;
        }
      }
      if (flag == false) arr.push({ name: List[i].name, _id: List[i]._id, pressed: false });
      flag = false;
    }
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
        setProfArgs(json.profile.tags_list);
        buildArray(List, json.profile.tags_list);
      });
  }

  async function getThings(setLoading) {
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
        setArgs(json.tags_list);
        getUserTags(json.tags_list);
      })
      .then(setLoading(false));
  }

  useEffect(() => {
    getThings(setLoading);
    setUserPos();
    // getUserTags();
  }, []);

  return (
    <>
      {firstTime && props.profil.tags_list.length == 0
      ? <View style={[globalStyles.container, {justifyContent: 'flex-start'}]}>
          <Text style={[globalStyles.titles, {marginVertical: 32}]}>Bienvenue sur Strollin {props.profil.pseudo} !</Text>
          <Text style={[globalStyles.titles, {marginVertical: 16}]}>Ici tu vas pouvoir choisir tes tags</Text>
          <Text style={[globalStyles.subparagraphs, {marginVertical: 8}]}>
            Ce qu'on appelle <Text style={[globalStyles.paragraphs, {color: '#0989FF'}]}>les tags</Text> c'est toutes les choses que tu aimes dans la vie. Ça permettra à l'application de <Text style={[globalStyles.paragraphs, {color: '#0989FF'}]}>générer des trajets en fonction de tes goûts</Text>.
          </Text>
          <Text style={[globalStyles.subparagraphs, {marginVertical: 8}]}>
            Pour les ajouter à ta liste t'auras juste à les sélectionner. Un tag ajouté dans ta liste de tag s'affiche avec un <Text style={[globalStyles.paragraphs, {color: '#0989FF'}]}>check</Text> derrière.
            Si il n'y a pas le check, t'as compris, il n'est pas dans ta liste.
          </Text>
          <Text style={[globalStyles.subparagraphs, {marginVertical: 8, marginBottom: 48}]}>
            Tu pourras les changer à tous moments dans ton profil en <Text style={[globalStyles.paragraphs, {color: '#0989FF'}]}>cliquant sur ta photo dans le menu</Text> 😉
          </Text>
          <PrimaryButton text="J'ai compris ! Je choisi mes tags" onPressFct={() => setFirstTime(false)}/>
        </View>
      : <View style={[globalStyles.container, {justifyContent: 'flex-start'}]}>
            <FlatList
              style={{width: '100%', paddingVertical: 86}}
              data={array}
              ListHeaderComponent={() => {
                return (<Text style={[globalStyles.titles]}>{I18n.t('Tags.select_our_tags')}</Text>)
              }}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{alignItems : 'center', justifyContent:'space-between'}}
              contentContainerStyle={{ paddingBottom : 90 }}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Tag name={item.name} chosen={item.pressed} setLoading={setLoading} pos={pos}/>
              )}
            />
          <Modal
            animationType="none"
            transparent={true}
            visible={isLoading}
          >
            <View style={styles.loading_screen}>
              <ActivityIndicator size="large"  color="black"/>
            </View>
          </Modal>
          <MenuButton props={props}/>
          <Footer primaryText="Valider mes tags" primaryOnPressFct={() => props.navigation.navigate(I18n.t("Menu.profile"))}/>
        </View>
      }
    </>
    // <View style={styles.view_back}>
    //   <Header navigation={navigation} />
    //   <View style={styles.viex_list}>
    //     <Text style={styles.text_field}>
    //       {I18n.t('Tags.select_our_tags')}
    //       <Text style={styles.text_star}> *</Text>
    //     </Text>
    //     <FlatList
    //       data={array}
    //       keyExtractor={(item) => item.name}
    //       renderItem={({ item }) => (
    //         <Tag name={item.name} chosen={item.pressed} setLoading={setLoading} />
    //       )}
    //     />
    //   </View>
    //   <TouchableOpacity
    //     style={styles.view_button}
    //     onPress={() => {
    //       navigation.navigate('Profile');
    //     }}
    //   >
    //     <Text style={styles.text_button}>
    //       {I18n.t('Tags.confirm_my_tags')}
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
  loading_screen: {
    backgroundColor:'rgba(100,100,100,0.75)',
    display: "flex",
    justifyContent: 'space-around',
    height: '100%'
  }
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
