import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Linking
} from 'react-native';
import { connect } from 'react-redux';
import CourseItem from './CourseItem';
import I18n from '../Translation/configureTrans';
import SearchBar from './TendanceSearchBar';
import Store from '../Store/configureStore';

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import Menu from './Menu';

import { DrawerActions } from '@react-navigation/native';


const imageFriend = require('../ressources/friend.png');
// const imageHistory = require('../ressources/history.png');
const imageProfile = require('../ressources/profile.png');

export function setSortedTendanceData(tag) {
  const store = Store.getState();
  const sortedData = [];

  console.log("tag = ", tag)
  for (i in store.tendance.tendanceList) {
    for (j in store.tendance.tendanceList[i].tags_list) {
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

export function getTendanceList() {
  const store = Store.getState();

  if (store.tendance.sortedTendanceList.length > 0) {
    return (store.tendance.sortedTendanceList);
  }
  return (store.tendance.tendanceList);
}

function getUrl(props) {
  console.log(props)
  if (props.profil.partner === true)
    return ("https://forms.gle/feBUmJ8wQFPGga4A6")
  return ('https://forms.gle/cR126bgPaexbgGYD9')
}

export function Header({ props, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);
  let url = getUrl(props)
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
          onPress={() => { Linking.openURL(url) }}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/form.png')} />
        </TouchableOpacity>
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

  return (
    <View style={styles.view_back}>
      <Header props={props} />
      <View style={styles.view_list}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={getTendanceList()}
          renderItem={({ item }) => (
            <CourseItem
              {...props}
              data={item}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        {/* export function HomePage(props) {

  const [drawer, setDrawer] = useState(null);

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.view_back}>
          <View style={styles.view_header}>
            <TouchableOpacity onPress={//() => props.navigation.navigate('Menu')
             () => props.navigation.dispatch(DrawerActions.openDrawer())
            }>
              <Image style={styles.img_header} source={require('../images/icons/black/menu.png')}/>
            </TouchableOpacity>
            <Text style={styles.text_header}>Home</Text>
            <TouchableOpacity>
              <Image style={styles.img_header} source={require('../images/icons/black/search.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.SearchBar}>
              <SearchBar
               onPress={setSortedTendanceData}
               imagePath='../images/icons/black/search.png'
              />
          </View>
          <View style={styles.viex_list}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={getTendanceList()}
              renderItem={({ item }) => (
                <TendenceCourseItem
                  {...props}
                  data={item}
                />
              )}
              keyExtractor={(item) => item["_id"]}
            />
          </View> */}

      </View>
    </View>
  );
}

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
  view_list: {
    flex: 757,
    width: '100%',
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(HomePage);
