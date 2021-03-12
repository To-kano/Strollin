import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList,
} from 'react-native';
import Box from './box';
import I18n from '../Translation/configureTrans';
import BackgroundImage from './backgroundImage';
import SearchBar from './TendanceSearchBar';
import { connect } from 'react-redux';
import Store from '../Store/configureStore';

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import Menu from './Menu';

const imageFriend = require('../ressources/friend.png');
// const imageHistory = require('../ressources/history.png');
const imageProfile = require('../ressources/profile.png');

export function setSortedTendanceData(tag) {
  const store = Store.getState();
  var sortedData = [];

  //console.log("tag = ", tag)
  for (i in store.tendance.tendanceList) {
    for (j in store.tendance.tendanceList[i]["tags_list"]) {
      if (store.tendance.tendanceList[i]["tags_list"][j] == tag) {
        sortedData.push(store.tendance.tendanceList[i]);
        break;
      }
    }
  }
  //console.log("sortedData = ", sortedData);
  const action = {
    type: 'SET_SORTED_TENDANCE_LIST',
    value: sortedData
  };
  Store.dispatch(action);
}

export function getData() {
  const store = Store.getState();

  if (store.tendance.sortedTendanceList.length > 0) {
    return (store.tendance.sortedTendanceList);
  } else {
    return (store.tendance.tendanceList);
  }
}
export function HomePage(props) {

  const [drawer, setDrawer] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <DrawerLayout
          ref={drawer => {
            setDrawer(drawer);
          }}
          drawerWidth={300}
          drawerPosition={DrawerLayout.positions.Left}
          drawerType="front"
          drawerBackgroundColor="#ddd"
          renderNavigationView={ () => <Menu navigation={props.navigation} name={"Home"} botNav={'historicUser'}/>}
          >
        <View style={styles.view_back}>
          <View style={styles.view_header}>
            <TouchableOpacity onPress={//() => props.navigation.navigate('Menu')
             () => drawer.openDrawer()
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
              data={getData()}
              renderItem={({ item }) => (
                <Box
                  {...props}
                  data={item}
                />
              )}
              keyExtractor={(item) => item["_id"]}
            />
          </View>
      
      </View>
    </DrawerLayout>
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
    flex: 757,
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(HomePage);
