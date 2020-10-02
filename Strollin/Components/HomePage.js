import React from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, FlatList
} from 'react-native';
import Box from './box';

const imageFriend = require('../ressources/friend.png');
const imageHistory = require('../ressources/history.png');
const imageProfile = require('../ressources/profile.png');

function HomePage(props) {
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
      period: "Toujours",
      destinations: ['Macdo', 'Sushi Land', 'Flunch']
    }
  ];
  return (
    <View style={styles.back}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ width: '20%', height: '100%', marginLeft: '10%' }}
          // onPress={() => console.log('hi')}
        >
          <Image
            style={{
              height: '70%', width: '70%', marginTop: '10%', marginLeft: '10%'
            }}
            source={imageFriend}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%', marginLeft: '10%' }}
          onPress={() => props.navigation.navigate('historicUser')}
        >
          <Image
            style={{
              height: '70%', width: '70%', marginTop: '10%', marginLeft: '10%'
            }}
            source={imageHistory}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%', marginLeft: '10%' }}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image
            style={{
              resizeMode: 'stretch', height: '70%', width: '70%', marginTop: '10%', marginLeft: '10%'
            }}
            source={imageProfile}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cont}>
        <Text style={{ fontSize: 40 }}> Trending trip: </Text>
      </View>
      <View style={styles.fill}>
        <FlatList
          data={DATA}
          contentContainerStyle={{ flexGrow: 0.1 }}
          renderItem={({item}) => <Box navigation={props.navigation} name={item.name} budget={item.budget} period={item.period} destinations={item.destinations} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ flex: 0.10, flexDirection: 'column' }}>
      <TouchableOpacity
          style={{
            alignItems: 'center', backgroundColor: '#E67E22', paddingVertical: '5%', paddingHorizontal: '32%'
          }}
          onPress={() => props.navigation.navigate('MenuChat')}
        >
          <Text style={{ fontSize: 15 }}> Go to Chat </Text>
      </TouchableOpacity>
        </View>
      <View style={{ flex: 0.10, flexDirection: 'column', marginTop: '10%' }}>
        <TouchableOpacity
          style={{
            alignItems: 'center', backgroundColor: '#E67E22', paddingVertical: '5%', paddingHorizontal: '32%'
          }}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Text style={{ fontSize: 15 }}> Start a new trip </Text>
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
    flex: 0.9,
    width: '100%',
  },
  header: {
    backgroundColor: '#E67E22',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
  },
  cont: {
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    backgroundColor: '#FFC300',
    width: '90%',
    borderRadius: 20
  },
});

export default HomePage;
