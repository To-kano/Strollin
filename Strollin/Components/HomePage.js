import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Button
} from 'react-native';
import Box from './box';
import I18n from '../Translation/configureTrans';
import BackgroundImage from './backgroundImage';

const imageFriend = require('../ressources/friend.png');
//const imageHistory = require('../ressources/history.png');
const imageProfile = require('../ressources/profile.png');

function HomePage(props) {

  console.log("HomPage");
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Geek Route',
      budget: '25 ~ 30€',
      period: "Fin d'après-midi",
      destinations: ['Starbucks', 'Reset', 'Cinéma']
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Bar Route',
      budget: '38 ~ 42€',
      period: "Fin d'après-midi",
      destinations: ['Bistrot Opéra', 'Jhin Dance', 'Paname']
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Full Bouffe',
      budget: '25 ~ 45€',
      period: 'Toujours',
      destinations: ['Macdo', 'Sushi Land', 'Flunch']
    }
  ];
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
            source={require('../ressources/plus.png')}
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
      <View style={styles.cont}>
        <Text style={{ fontSize: 40 }}> Trending trip: </Text>
      </View>
      <View style={styles.fill}>
        <FlatList
          data={DATA}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <Box
              style={{ height: '100%' }}
              {...item}
              navigation={props.navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity
          style={styles.newTrip}
          onPress={() => props.navigation.navigate('MenuChat')}
        >
          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
            Go to Chat
          </Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginTop: 10,
    width: '95%',
    borderRadius: 5,
    opacity: 0.9,
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
  },
  newTrip: {
    alignItems: 'center',
    backgroundColor: '#F07323',
    paddingVertical: '5%',
    paddingHorizontal: '30%',
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
    height: '120%',
    borderRadius: 20
  },
});

export default HomePage;
