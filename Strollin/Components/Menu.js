import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { profileUser } from '../apiServer/user';

import GestureRecognizer from 'react-native-swipe-gestures';

import { DrawerActions } from '@react-navigation/native';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import I18n from '../Translation/configureTrans';
import Store from '../Store/configureStore';

import ImageProfile from './ImageProfile';

function Menu(props) {
  const store = Store.getState();
  const config = {
    velocityThreshold: 0.05,
    directionalOffsetThreshold: 80,
    gestureIsClickThreshold: 0.5
  };
   console.log("customDrawer ", props.state)

  return (
    <View style={styles.horizontal}>
      <View style={styles.view_menu}>
        <View style={styles.view_profile}>
          <ImageProfile style={styles.img_profile} />
          <Text style={styles.text_profile}>{props.profil.pseudo}</Text>
          <Text style={styles.text_grade}>Traveler</Text>
        </View>
        <ScrollView style={styles.view_navigation}>
          <TouchableOpacity
            onPress={() => {
              profileUser(props, store.profil.access_token);
              props.navigation.navigate(props.state.routeNames[0]);
            }}
            style={[styles.view_navigationIn, props.state.index == 0 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/home.png')} />
            <Text style={styles.text_navigationIn}>{props.state.routeNames[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('navigate');
              props.navigation.navigate(props.state.routeNames[1]);
            }}
            style={[styles.view_navigationIn, props.state.index == 1 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/historic.png')} />
            <Text style={styles.text_navigationIn}>{props.state.routeNames[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(
              "New trip",
              {
                screen: 'CourseSetting'
              }
              )}
            style={[styles.view_navigationIn, props.state.index == 2 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/next_trip.png')} />
            <Text style={styles.text_navigationIn}>{props.state.routeNames[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(props.state.routeNames[3])}
            style={[styles.view_navigationIn, props.state.index == 3 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/friends.png')} />
            <Text style={styles.text_navigationIn}>{props.state.routeNames[3]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const action = { type: 'SET_SEARCH_CONV_LIST', value: props.conversation.conversationList };
              props.dispatch(action);
              props.navigation.navigate(props.state.routeNames[4]);
            }}
            style={[styles.view_navigationIn, props.state.index == 4 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/chats.png')} />
            <Text style={styles.text_navigationIn}>{props.state.routeNames[4]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(props.state.routeNames[5])}
            style={[styles.view_navigationIn, props.state.index == 5 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/profile.png')} />
            <Text style={styles.text_navigationIn}>{props.state.routeNames[5]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(props.state.routeNames[6])}
            style={[styles.view_navigationIn, props.state.index == 6 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/partner.png')} />
            <Text style={styles.text_navigationIn}>{props.state.routeNames[6]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(props.state.routeNames[7])}
            style={[styles.view_navigationIn, props.state.index == 7 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/settings.png')} />
            <Text style={styles.text_navigationIn}>{props.state.routeNames[7]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Personal_trip')}
            style={[styles.view_navigationIn, props.name == 'Personal_trip' ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/next_trip.png')} />
            <Text style={styles.text_navigationIn}>Personal_trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Position_partener')}
            style={[styles.view_navigationIn, props.name == 'Position_partener' ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/next_trip.png')} />
            <Text style={styles.text_navigationIn}>Position_partener</Text>
          </TouchableOpacity>
        </ScrollView>
        {/*<TouchableOpacity
          onPress={() => props.navigation.navigate('userLogin')}
          style={styles.view_logOut}
        >
          <Text style={styles.text_logOut}>Log Out</Text>
        </TouchableOpacity>*/}
      </View>
      <GestureRecognizer
        onSwipeDown={(state) => {
          if (props.state.index > 0) {
            props.navigation.navigate(props.state.routeNames[props.state.index - 1]);
            props.navigation.dispatch(DrawerActions.openDrawer());
          }
        }}
        onSwipeUp={(state) => {
          if (props.state.index < 7) {
            props.navigation.navigate(props.state.routeNames[props.state.index + 1]);
            props.navigation.dispatch(DrawerActions.openDrawer());
          }
        }}
        config={config}
        style={{
          flex: 1,
          width: 30,
          backgroundColor: 'white'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  current_page: {
    width: '150%',
    backgroundColor: '#CFEAEE',
    borderRadius: 4,
  },
  view_menu: {
    flex: 2,
    justifyContent: 'space-around',
    flexDirection: 'column',
    padding: 10,

    backgroundColor: '#FFFFFF',
  },
  view_close: {
    flex: 5,
    flexDirection: 'row-reverse',
  },
  img_close: {
    width: 30,
    height: 30,
  },
  view_profile: {
    height: 200,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  img_profile: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 7.5,
  },
  text_profile: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#000000',
    marginBottom: 7.5,
  },
  text_grade: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#B9B9B9',
  },
  view_navigation: {
    flexDirection: 'column',
  },
  view_navigationIn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14.7,
    width: 140
  },
  img_navigationIn: {
    width: 30,
    height: 30,
    marginRight: 6.3
  },
  text_navigationIn: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  view_logOut: {
    width: 127,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#0092A7',
  },
  text_logOut: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Menu);
