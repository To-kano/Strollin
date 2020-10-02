import React, {useState} from 'react';
import {StyleSheet ,Text , View, Image, TextInput, TouchableOpacity, FlatList, Button} from "react-native";
import Box from './box'

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
      <View style={styles.header}>
        <TouchableOpacity
          style={{width: '20%', height: '100%', marginLeft: '10%'}}
          onPress={() => props.navigation.navigate('FriendList')}
        >
          <Image style={{height: '70%', width: '70%', marginTop: '10%', marginLeft: '10%'}} source={require('../ressources/friend.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%', marginLeft: '10%'}}
          onPress={() => props.navigation.navigate('historicUser')}
        >
          <Image style={{height: '70%', width: '70%', marginTop: '10%', marginLeft: '10%'}} source={require('../ressources/history.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%', marginLeft: '10%'}}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image style={{resizeMode: 'stretch', height: '70%', width: '70%', marginTop: '10%', marginLeft: '10%'}} source={require('../ressources/profile.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.fill}>
        <FlatList
          data={DATA}
          contentContainerStyle={{ flexGrow: 0.1}}
          renderItem={({ item }) => <Box style={{height: '80%'}}/>}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{flex: 0.10, flexDirection: 'column', marginTop: '10%'}}>
        <TouchableOpacity
          style={{alignItems: "center", backgroundColor: "#E67E22", paddingVertical: '5%', paddingHorizontal: '32%'}}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Text style={{fontSize: 15}}> Start a new trip </Text>
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
  }
});

export default HomePage;
