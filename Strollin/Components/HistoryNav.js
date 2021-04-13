import { connect } from 'react-redux';
import React, { useState } from 'react';
import {
  Text, View, Image, FlatList, Button, ImageBackground, TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { DrawerActions } from '@react-navigation/native';
import HistoryItem from './historyItem';
import BackgroundImage from './backgroundImage';
import I18n from '../Translation/configureTrans';
import Box from './box';

import Menu from './Menu';

export function HistoryNav({ navigation, profil }) {
  const [drawer, setDrawer] = useState(null);

  // console.log("profile = ", profil);
  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Menu')}> */}
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.historic')}
          {'   '}
        </Text>
      </View>
      <View style={styles.viex_list}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={profil.course_historic}
          renderItem={({ item }) => (
            <HistoryItem courseId={item} />
          )}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => (
  {
    profil: state.profil
  }
);
export default connect(mapStateToProps)(HistoryNav);

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
    width: '87.6%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  viex_list: {
    flex: 757,
  },
  view_historic: {
    flexDirection: 'column',
    marginBottom: 30,
  },
  view_information: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img_date: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_date: {
    flex: 2,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#333333',
  },
  img_duration: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_duration: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#333333',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  view_historicTop: {
    flexDirection: 'column',
  },

  // container: {
  //   // flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   // justifyContent: 'center',
  //   // backgroundColor: "gray"
  // },
  // center: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // backgroundColor: "gray"
  // },
  // back: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  // },
  // fill: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.90,
  //   backgroundColor: '#FFFFFF',
  //   padding: 5,
  //   marginTop: 10,
  //   width: '95%',
  //   borderRadius: 5,
  //   opacity: 0.9,
  // },
  // header: {
  //   backgroundColor: '#FFFFFF',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.082,
  //   width: '100%',
  // },
  // newTrip: {
  //   flex: 0.65,
  //   alignItems: 'center',
  //   backgroundColor: '#F07323',
  //   paddingVertical: '5%',
  //   // width: '90%',
  //   paddingHorizontal: '38%',
  //   borderRadius: 5,
  // }
});
