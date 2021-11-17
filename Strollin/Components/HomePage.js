import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Linking, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import CourseItem from './CourseItem';
import I18n from '../Translation/configureTrans';
import SearchBar from './TendanceSearchBar';
import Store from '../Store/configureStore';

const globalStyles = require('../Styles');

//import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
//import Menu from './Menu';

import { DrawerActions } from '@react-navigation/native';
import MenuButton from './components/MenuButton';
import Footer from './components/Footer';


//const imageFriend = require('../ressources/friend.png');
// const imageHistory = require('../ressources/history.png');
//const imageProfile = require('../ressources/profile.png');

export function setSortedTendanceData(tag) {
  const store = Store.getState();
  const sortedData = [];

  //console.log("tag = ", tag, )
  for (i in store.tendance.tendanceList) {
    for (j in store.tendance.tendanceList[i].tags_list) {
      //console.log('tags list ', store.tendance.tendanceList[i].tags_list)
      if (store.tendance.tendanceList[i].tags_list[j] == tag) {
        sortedData.push(store.tendance.tendanceList[i]);
        break;
      }
    }
  }
  // console.log("sortedData = ", sortedData);
  const action = {
    type: 'SET_SORTED_TENDANCE_LIST',
    value: sortedData
  };
  Store.dispatch(action);
}

function getTendanceList() {
  const store = Store.getState();

  if (store.tendance.sortedTendanceList.length > 0) {
    //console.log("tendenc filter", store.tendance.sortedTendanceList)
    return (store.tendance.sortedTendanceList);
  }
  return (store.tendance.tendanceList);
}

function getUrl(props) {
//console.log(props)
  if (props.profil.partner === true)
    return ("https://forms.gle/feBUmJ8wQFPGga4A6")
  return ('https://forms.gle/cR126bgPaexbgGYD9')
}

function Header({ props, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);

  if (pressed === false) {
    return (
      <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.home')}
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
      <SearchBar
        onPress={(data) => { setSortedTendanceData(data); setpressed(!pressed); }}
        imagePath="../images/icons/black/search.png"
      />
    </View>
  );
}

export function HomePage(props) {

  let url = getUrl(props);
  return (
    <View style={globalStyles.container}>
      <View
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 96 }}
      >
        <Text style={[globalStyles.titles, { marginBottom: 32, }]}>Salut {props.profil.pseudo} !</Text>
        { getTendanceList().length > 0
          ? <FlatList
              style={{width: '100%', height: '70%'}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={getTendanceList()}
              renderItem={({ item }) => (
                <CourseItem
                  {...props}
                  data={item}
                />
              )}
              keyExtractor={(item) => item.id }
            />
          : <Text style={globalStyles.subtitles}>T'es nouveau par ici dis moi ! Essaye donc de faire un trajet 😉</Text>
        }
      </View>
      <MenuButton props={props}/>
      <SearchBar
        onPress={(data) => { setSortedTendanceData(data); }}
        imagePath="../images/icons/black/search.png"
      />
      <Footer primaryText="Une envie de sortir ?" primaryOnPressFct={() => props.navigation.navigate(I18n.t("Menu.newTrip"), { screen: 'CourseSettings' })}/>
    </View>

      // {/* <TouchableOpacity
      //   onPress={() => { Linking.openURL(url) }}
      //   style={styles.view_form}
      // >
      //   <Image style={styles.img_form} source={require('../images/icons/black/form.png')} />
      // </TouchableOpacity>
      // <TouchableOpacity
      //   onPress={() => { Linking.openURL(url) }}
      //   style={styles.view_form_text}
      // >
      //   <Text>Accéder au formulaire</Text>
      // </TouchableOpacity>
      // <TouchableOpacity
      //   onPress={() => { Linking.openURL("https://forms.gle/CzzEjaVahZ7TdyLE6") }}
      //   style={styles.view_form2}
      // >
      //   <Image style={styles.img_form} source={require('../images/icons/black/bug.png')} />
      // </TouchableOpacity>
      // <TouchableOpacity
      //   onPress={() => { Linking.openURL("https://forms.gle/CzzEjaVahZ7TdyLE6") }}
      //   style={styles.view_form_text2}
      // >
      //   <Text>Reporter un bug</Text>
      // </TouchableOpacity> */}
    // {/* </View> */}
  );
}

const styles = StyleSheet.create({
  view_form_text: {
    position: 'absolute',
    bottom:20,
    left:35,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingLeft:30,
    elevation: 5,
  },
  view_form: {
    flexDirection: 'row',
    position: 'absolute',
    bottom:10,
    left:10,
    backgroundColor: '#FAC402',
    borderRadius: 30,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 6,
  },
  view_form_text2: {
    position: 'absolute',
    bottom:80,
    left:35,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingLeft:30,
    elevation: 5,
  },
  view_form2: {
    flexDirection: 'row',
    position: 'absolute',
    bottom:70,
    left:10,
    backgroundColor: '#FAC402',
    borderRadius: 30,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 6,
  },
  img_form: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
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
  view_list: {
    flex: 757,
    width: '100%',
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(HomePage);
