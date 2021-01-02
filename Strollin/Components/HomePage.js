import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Button
} from 'react-native';
import Box from './box';
import I18n from '../Translation/configureTrans';
import BackgroundImage from './backgroundImage';
import SearchBar from './TendanceSearchBar';
import { connect } from 'react-redux';
import Store from '../Store/configureStore';


const imageFriend = require('../ressources/friend.png');
// const imageHistory = require('../ressources/history.png');
const imageProfile = require('../ressources/profile.png');

function setSortedTendanceData(tag) {
  const store = Store.getState();
  var sortedData = [];
  var i = 0;
  var j = 0;

  console.log("tag = ", tag)
  for (i in store.tendance.tendanceList) {
    for (j in store.tendance.tendanceList[i].tag) {
      if (store.tendance.tendanceList[i].tag[j] == tag) {
        sortedData.push(store.tendance.tendanceList[i]);
        break;
      }
    }
  }
  console.log("sortedData = ", sortedData);
  const action = {
    type: 'SET_SORTED_TENDANCE_LIST',
    value: sortedData
  };
  Store.dispatch(action);
}

function getData() {
  const store = Store.getState();

  if (store.tendance.sortedTendanceList.length > 0) {
    return (store.tendance.sortedTendanceList);
  } else {
    return (store.tendance.tendanceList);
  }
}

function HomePage(props) {
  console.log('HomePage');
  return (
    <View style={styles.back}>
      <BackgroundImage />
      <View style={styles.header}>
        <TouchableOpacity
          style={{ width: '20%', height: '100%', marginLeft: 15 }}
          onPress={() => props.navigation.navigate('HomePage')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/home.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('historicUser')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/trip.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/plus.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('FriendList')}
        >
          <Image
            style={{
              marginTop: '10%', height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/friend.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/profile.png')}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.cont}>
        <Text style={{ fontSize: 40 }}> Trending trip: </Text>
      </View> */}
      <View style={styles.fill}>
        <View style={styles.SearchBar}>
          <SearchBar
            onPress={setSortedTendanceData}
            imagePath="../images/loupe.png"
          />
        </View>
        <FlatList
          data={getData()}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <Box
              style={{ height: '100%', width: '100%' }}
              {...props}
              data={item}
              // {...item}
              // navigation={props.navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity
          style={styles.newTrip}
          onPress={() => {
            const action = {type: 'SET_SEARCH_CONV_LIST', value: props.conversation.conversationList };
            props.dispatch(action);
            props.navigation.navigate('MenuChat');
          }}
        >
          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
            Go to Chat
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity
          style={styles.newTrip}
          onPress={() => {
            props.navigation.navigate('CourseEvaluation');
          }}
        >
          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
            Go to Evaluation
          </Text>
        </TouchableOpacity>
      </View>*/}
      <View style={{ flex: 0.10, flexDirection: 'column', margin: '5%' }}>
        <TouchableOpacity
          style={styles.newTrip}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
            {' '}
            {I18n.t('startNewTrip')}
            {' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  fill: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginTop: "10%",
    width: '95%',
    borderRadius: 5,
    opacity: 0.9,
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.091,
    width: '100%',
  },
  newTrip: {
    flex: 0.85,
    alignItems: 'center',
    backgroundColor: '#F07323',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    borderRadius: 5,
  },
  cont: {
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    backgroundColor: '#FFC300',
    width: '90%',
    height: '100%',
    borderRadius: 20
  },
  SearchBar: {
    width: '15.5%'
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(HomePage);