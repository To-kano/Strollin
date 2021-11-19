import React, { Component } from 'react';
import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Modal
} from 'react-native';
import { connect } from 'react-redux';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { profileUser } from '../apiServer/user';

//import GestureRecognizer from 'react-native-swipe-gestures';

import { DrawerActions } from '@react-navigation/native';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import I18n from '../Translation/configureTrans';
import Store from '../Store/configureStore';

import ImageProfile from './components/ImageProfile';

import { logoutUser } from '../apiServer/user';
import Icon from './components/Icon';

const globalStyles = require('../Styles');

function Menu(props) {
  const store = Store.getState();
  const config = {
    velocityThreshold: 0.05,
    directionalOffsetThreshold: 80,
    gestureIsClickThreshold: 0.5
  };
  const [isLoading, setLoading] = React.useState(false);

  return (
    <View style={styles.horizontal}>
      <View style={styles.view_menu}>
        <TouchableOpacity style={styles.view_profile} onPress={() => props.navigation.navigate(props.state.routeNames[5])}>
          <ImageProfile style={styles.img_profile} />
          <Text style={[globalStyles.subtitles, {textTransform: 'capitalize'}]}>{props.profil.pseudo}</Text>
        </TouchableOpacity>
        <View style={styles.view_navigation}>
          <TouchableOpacity
            onPress={() => {
              profileUser(props, store.profil.access_token);
              props.navigation.navigate(props.state.routeNames[0], { screen: 'HomePage' });
            }}
            style={[styles.view_navigationIn, props.state.index == 0 ? styles.current_page : {}]}
          >
            <Icon name='home' size={32} color='#1C1B1C'/>
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{props.state.routeNames[0]}</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
            //console.log('navigate');
              props.navigation.navigate(props.state.routeNames[1]);
            }}
            style={[styles.view_navigationIn, props.state.index == 1 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/historic.png')} />
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{props.state.routeNames[1]}</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => props.navigation.navigate(props.state.routeNames[2])}
            style={[styles.view_navigationIn, props.state.index == 2 ? styles.current_page : {}]}
          >
            <Icon name='marker' size={32} color='#1C1B1C'/>
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{props.state.routeNames[2]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate(props.state.routeNames[3])}
            style={[styles.view_navigationIn, props.state.index == 3 ? styles.current_page : {}]}
          >
            <Icon name='friend' size={32} color='#1C1B1C'/>
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{props.state.routeNames[3]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const action = { type: 'SET_SEARCH_CONV_LIST', value: props.conversation.conversationList };
              props.dispatch(action);
              props.navigation.navigate(props.state.routeNames[4]);
            }}
            style={[styles.view_navigationIn, props.state.index == 4 ? styles.current_page : {}]}
          >
            <Icon name='conversation' size={32} color='#1C1B1C'/>
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{props.state.routeNames[4]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              profileUser(props, store.profil.access_token);
              props.navigation.navigate(props.state.routeNames[8]);
            }}
            style={[styles.view_navigationIn, props.state.index == 8 ? styles.current_page : {}]}
          >
            <Icon name='star_empty' size={32} color='#1C1B1C'/>
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{props.state.routeNames[8]}</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate(props.state.routeNames[5])}
            style={[styles.view_navigationIn, props.state.index == 5 ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/profile.png')} />
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{props.state.routeNames[5]}</Text>
          </TouchableOpacity> */}

          {props.profil.partner &&
          <>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(props.state.routeNames[6])}
              style={[styles.view_navigationIn, {marginTop: 48}, props.state.index == 6 ? styles.current_page : {}]}
            >
              <Icon name='partner' size={32} color='#1C1B1C'/>
              <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{props.state.routeNames[6]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate(props.state.routeNames[7])}
              style={[styles.view_navigationIn, props.state.index == 7 ? styles.current_page : {}]}
            >
              <Icon name='settings' size={32} color='#1C1B1C'/>
              <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{props.state.routeNames[7]}</Text>
            </TouchableOpacity>
          </>
          }

          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('Personal_trip')}
            style={[styles.view_navigationIn, props.name == 'Personal_trip' ? styles.current_page : {}]}
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>Personal_trip</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('Position_partener')}
            style={[styles.view_navigationIn, props.name == 'Position_partener' ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/next_trip.png')} />
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>Position_partener</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('Subscription')}
            style={[styles.view_navigationIn, props.name == 'Subscription' ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/next_trip.png')} />
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>Subscription</Text>
          </TouchableOpacity> */}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              logoutUser(props, store.profil.access_token, setLoading);
            }}
            style={[styles.view_navigationIn, {position: 'absolute', bottom: 0}]}
          >
            <Icon name='logout' size={32} color='#1C1B1C'/>
            <Text style={[globalStyles.paragraphs, {marginLeft: 8}]}>{I18n.t('Menu.logOut')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Guide')}
            style={[styles.view_navigationIn, props.name == 'Guide' ? styles.current_page : {}]}
          >
            <Image style={styles.img_navigationIn} source={require('../images/icons/black/next_trip.png')} />
            <Text style={styles.text_navigationIn}>Guide</Text>
          </TouchableOpacity>
        {/*</ScrollView>*/}
        {/*<TouchableOpacity
          onPress={() => props.navigation.navigate('userLogin')}
          style={styles.view_logOut}
        >
          <Text style={styles.text_logOut}>Log Out</Text>
        </TouchableOpacity>*/}
        </View>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isLoading}
      >
        <View style={styles.loading_screen}>
          <ActivityIndicator size="large"  color="black" style={{}}/>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  current_page: {
    width: '100%',
    backgroundColor: '#D6EBFF',
    borderRadius: 4,
  },
  view_menu: {
    width: '100%',
    flexDirection: 'column',
    padding: 16,
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
  },
  view_close: {
    flex: 5,
    flexDirection: 'row-reverse',
  },
  view_profile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  img_profile: {
    width: 96,
    height: 96,
    borderRadius: 16,
    marginBottom: 8,
  },
  text_profile: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    letterSpacing: 2,
    color: '#000000',
  },
  text_grade: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#B9B9B9',
  },
  view_navigation: {
    marginTop: 48,
    flexDirection: 'column',
    width: '100%',
    flex: 1,
  },
  view_navigationIn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding : 5,
    marginTop: 6,
    width: '100%'
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
  disconnect_button: {
    flex: 1,
    marginRight: 20,
    marginTop: 75,
  },
  loading_screen: {
    backgroundColor:'rgba(100,100,100,0.75)',
    display: "flex",
    justifyContent: 'space-around',
    height: '100%'
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Menu);
