import React, {useState} from 'react';
import {StyleSheet ,Text , View, Image, TextInput, TouchableOpacity, FlatList, Button} from "react-native";
import Box from './box'
import BackgroundImage from './backgroundImage';


function HomePage(props) {

  const [value, onChangeText] = React.useState('');
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      img: '../ressources/history.png'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      img: '../ressources/history.png'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      img: '../ressources/history.png'
    },
  ];

  return (
    <View style={styles.back}>
      <BackgroundImage/>
      <View style={styles.header}>
        <TouchableOpacity
          style={{width: '20%', height: '100%', marginLeft: 15}}
          onPress={() => props.navigation.navigate('HomePage')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/home.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('historicUser')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/history.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/plus.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => console.log('friend')}
        >
          <Image style={{marginTop: "10%", height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/friend.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/profile.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.fill}>
        <FlatList
          data={DATA}
          contentContainerStyle={{ flexGrow: 1}}
          renderItem={({ item }) => <Box style={{height: '100%'}}/>}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{flex: 0.10, flexDirection: 'column', margin: '5%'}}>
        <TouchableOpacity
          style={styles.newTrip}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Text style={{fontSize: 16, color: '#FFFFFF'}}> Start a new trip </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
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
    alignItems: "center", 
    backgroundColor: "#F07323", 
    paddingVertical: '5%', 
    paddingHorizontal: '30%', 
    borderRadius: 5,
  }
});

export default HomePage;
