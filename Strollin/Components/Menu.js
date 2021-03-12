import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../Translation/configureTrans';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import { TouchableHighlight } from 'react-native-gesture-handler';

function Menu(props) {
  return (
    <View style={styles.view_menu}>
      <View style={styles.view_profile}>
        <Image style={styles.img_profile} source={require('../images/TonyPP.jpg')} />
        <Text style={styles.text_profile}>{props.profil.pseudo}</Text>
        <Text style={styles.text_grade}>Traveler</Text>
      </View>
      <View style={styles.view_navigation}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('HomePage')}
          style={[styles.view_navigationIn, props.name == "Home" ? styles.current_page : {}]}
        >
          <Image style={styles.img_navigationIn} source={require('../images/icons/black/home.png')} />
          <Text style={styles.text_navigationIn}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('historicUser')}
          style={[styles.view_navigationIn, props.name == "Historic" ? styles.current_page : {}]}
        >
          <Image style={styles.img_navigationIn} source={require('../images/icons/black/historic.png')} />
          <Text style={styles.text_navigationIn}>Historic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CourseSettings')}
          style={[styles.view_navigationIn, props.name == "New Trip" ? styles.current_page : {}]}
        >
          <Image style={styles.img_navigationIn} source={require('../images/icons/black/next_trip.png')} />
          <Text style={styles.text_navigationIn}>New Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('FriendList')}
          style={[styles.view_navigationIn, props.name == "Friends" ? styles.current_page : {}]}
        >
          <Image style={styles.img_navigationIn} source={require('../images/icons/black/friends.png')} />
          <Text style={styles.text_navigationIn}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
             const action = {type: 'SET_SEARCH_CONV_LIST', value: props.conversation.conversationList };
             props.dispatch(action);
             props.navigation.navigate('MenuChat');
           }}
          style={[styles.view_navigationIn, props.name == "Chats" ? styles.current_page : {}]}
        >
          <Image style={styles.img_navigationIn} source={require('../images/icons/black/chats.png')} />
          <Text style={styles.text_navigationIn}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Profile')}
          style={[styles.view_navigationIn, props.name == "Profile" ? styles.current_page : {}]}
        >
          <Image style={styles.img_navigationIn} source={require('../images/icons/black/profile.png')} />
          <Text style={styles.text_navigationIn}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PartenaireScreen')}
          style={[styles.view_navigationIn, props.name == "Partner" ? styles.current_page : {}]}
        >
          <Image style={styles.img_navigationIn} source={require('../images/icons/black/partner.png')} />
          <Text style={styles.text_navigationIn}>Partner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SettingPartenaire')}
          style={[styles.view_navigationIn, props.name == "Settings" ? styles.current_page : {}]}
        >
          <Image style={styles.img_navigationIn} source={require('../images/icons/black/settings.png')} />
          <Text style={styles.text_navigationIn}>Settings</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('userLogin')}
        style={styles.view_logOut}
      >
        <Text style={styles.text_logOut}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  current_page: {
    backgroundColor: 'red'
  },
  view_menu: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.10,
    elevation: 10,
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
    flex: 24.6,
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
    flex: 54.6,
    flexDirection: 'column',
  },
  view_navigationIn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14.7
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
